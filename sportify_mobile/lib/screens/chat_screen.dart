// // lib/screens/chat_screen.dart
// import 'package:flutter/material.dart';

// class ChatScreen extends StatefulWidget {
//   final String conversationName;

//   const ChatScreen({super.key, required this.conversationName});

//   @override
//   State<ChatScreen> createState() => _ChatScreenState();
// }

// class _ChatScreenState extends State<ChatScreen> {
//   final TextEditingController _messageController = TextEditingController();
//   final List<Map<String, String>> messages = [
//     {
//       'sender': 'Nguyen A',
//       'avatar': 'https://via.placeholder.com/150',
//       'text': 'Hi there!'
//     },
//     {
//       'sender': 'You',
//       'avatar': 'https://via.placeholder.com/150',
//       'text': 'Hello! How are you?'
//     },
//     {
//       'sender': 'Nguyen A',
//       'avatar': 'https://via.placeholder.com/150',
//       'text': 'Im good, thanks. What about you?'
//     },
//     {
//       'sender': 'You',
//       'avatar': 'https://via.placeholder.com/150',
//       'text': 'Doing great. Are we playing football this weekend?'
//     },
//     {
//       'sender': 'Nguyen A',
//       'avatar': 'https://via.placeholder.com/150',
//       'text': 'Yes, Im in. What time?'
//     },
//   ];

//   void _sendMessage() {
//     final messageText = _messageController.text.trim();
//     if (messageText.isNotEmpty) {
//       setState(() {
//         messages.add({
//           'sender': 'You',
//           'avatar': 'https://via.placeholder.com/150',
//           'text': messageText,
//         });
//         _messageController.clear();
//       });
//     }
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: Text(widget.conversationName),
//       ),
//       body: Column(
//         children: [
//           Expanded(
//             child: ListView.builder(
//               itemCount: messages.length,
//               itemBuilder: (context, index) {
//                 final message = messages[index];
//                 return Row(
//                   crossAxisAlignment: CrossAxisAlignment.start,
//                   children: [
//                     CircleAvatar(
//                       backgroundImage: NetworkImage(message['avatar']!),
//                     ),
//                     const SizedBox(width: 8),
//                     Expanded(
//                       child: Container(
//                         margin: const EdgeInsets.symmetric(vertical: 4),
//                         padding: const EdgeInsets.all(12),
//                         decoration: BoxDecoration(
//                           color: message['sender'] == 'You'
//                               ? Colors.blue[100]
//                               : Colors.grey[200],
//                           borderRadius: BorderRadius.circular(8),
//                         ),
//                         child: Column(
//                           crossAxisAlignment: CrossAxisAlignment.start,
//                           children: [
//                             Text(
//                               message['sender']!,
//                               style:
//                                   const TextStyle(fontWeight: FontWeight.bold),
//                             ),
//                             const SizedBox(height: 4),
//                             Text(message['text']!),
//                           ],
//                         ),
//                       ),
//                     ),
//                   ],
//                 );
//               },
//             ),
//           ),
//           Padding(
//             padding: const EdgeInsets.all(8.0),
//             child: Row(
//               children: [
//                 Expanded(
//                   child: TextField(
//                     controller: _messageController,
//                     decoration: const InputDecoration(
//                       hintText: 'Type a message...',
//                       border: OutlineInputBorder(),
//                     ),
//                   ),
//                 ),
//                 const SizedBox(width: 8),
//                 IconButton(
//                   icon: const Icon(Icons.send),
//                   onPressed: _sendMessage,
//                 ),
//               ],
//             ),
//           ),
//         ],
//       ),
//     );
//   }
// }
import 'package:flutter/material.dart';
import '../services/chat_service.dart';

class ChatScreen extends StatefulWidget {
  final String token;
  final int roomId;
  final int userId;
  final String conversationName;
  final String otherUserAvatar;

  const ChatScreen({
    super.key,
    required this.token,
    required this.roomId,
    required this.userId,
    required this.conversationName,
    required this.otherUserAvatar,
  });

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final TextEditingController _messageController = TextEditingController();
  final ScrollController _scrollController =
      ScrollController(); // Thêm controller

  List<Map<String, dynamic>> messages = [];
  late ChatService chatService;
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    chatService = ChatService(onMessageReceived: _onNewMessage);
    chatService.connect(widget.token, widget.roomId);
    fetchMessages();
  }

  Future<void> fetchMessages() async {
    try {
      List<Map<String, dynamic>> chatMessages =
          await chatService.getMessages(widget.token, widget.roomId);
      setState(() {
        messages = chatMessages;
        isLoading = false;
      });
      _scrollToBottom(); // Cuộn xuống cuối sau khi tải tin nhắn cũ
    } catch (error) {
      setState(() {
        isLoading = false;
      });
      print('Error loading messages: $error');
    }
  }

  void _sendMessage() {
    final messageText = _messageController.text.trim();
    if (messageText.isNotEmpty) {
      chatService.sendMessage(widget.roomId, widget.userId, messageText);
      _messageController.clear();
    }
  }

  /// Khi nhận tin nhắn mới từ WebSocket
  void _onNewMessage(Map<String, dynamic> message) {
    setState(() {
      messages.add(message);
    });
    _scrollToBottom(); // Cuộn xuống khi có tin nhắn mới
  }

  /// Cuộn xuống cuối danh sách tin nhắn
  void _scrollToBottom() {
    Future.delayed(const Duration(milliseconds: 300), () {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  @override
  void dispose() {
    chatService.disconnect();
    _scrollController.dispose(); // Giải phóng bộ nhớ
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.conversationName),
      ),
      body: Column(
        children: [
          Expanded(
            child: isLoading
                ? const Center(child: CircularProgressIndicator())
                : ListView.builder(
                    controller:
                        _scrollController, // Gán controller vào ListView
                    itemCount: messages.length,
                    itemBuilder: (context, index) {
                      final message = messages[index];
                      final isMe = message['senderId'] == widget.userId;

                      return Align(
                        alignment:
                            isMe ? Alignment.centerRight : Alignment.centerLeft,
                        child: Container(
                          margin: const EdgeInsets.symmetric(
                              vertical: 4, horizontal: 8),
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: isMe ? Colors.blue[100] : Colors.grey[200],
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                message['senderName'],
                                style: const TextStyle(
                                    fontWeight: FontWeight.bold),
                              ),
                              const SizedBox(height: 4),
                              Text(message['content']),
                            ],
                          ),
                        ),
                      );
                    },
                  ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _messageController,
                    decoration: const InputDecoration(
                      hintText: 'Type a message...',
                      border: OutlineInputBorder(),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                IconButton(
                  icon: const Icon(Icons.send),
                  onPressed: _sendMessage,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
