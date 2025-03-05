// import 'package:flutter/material.dart';
// import 'chat_screen.dart';

// class MessageScreen extends StatefulWidget {
//   final String token;
//   const MessageScreen({super.key, required this.token});

//   @override
//   State<MessageScreen> createState() => _MessageScreenState();
// }

// class _MessageScreenState extends State<MessageScreen> {
//   final List<Map<String, String>> conversations = [
//     {
//       'avatarUrl': 'https://via.placeholder.com/150',
//       'name': 'Nguyen A',
//       'latestMessage': 'Hey, how are you?'
//     },
//     {
//       'avatarUrl': 'https://via.placeholder.com/150',
//       'name': 'Football Lovers Group',
//       'latestMessage': 'Match this weekend?'
//     },
//     {
//       'avatarUrl': 'https://via.placeholder.com/150',
//       'name': 'Tran B',
//       'latestMessage': 'See you tomorrow!'
//     },
//   ];

//   String searchQuery = '';

//   @override
//   Widget build(BuildContext context) {
//     final filteredConversations = conversations.where((conversation) {
//       return conversation['name']!
//           .toLowerCase()
//           .contains(searchQuery.toLowerCase());
//     }).toList();

//     return Scaffold(
//       appBar: AppBar(
//         title: const Text('Messages'),
//       ),
//       body: Column(
//         children: [
//           Padding(
//             padding: const EdgeInsets.all(8.0),
//             child: TextField(
//               decoration: const InputDecoration(
//                 labelText: 'Search',
//                 border: OutlineInputBorder(),
//                 prefixIcon: Icon(Icons.search),
//               ),
//               onChanged: (value) {
//                 setState(() {
//                   searchQuery = value;
//                 });
//               },
//             ),
//           ),
//           Expanded(
//             child: ListView.builder(
//               itemCount: filteredConversations.length,
//               itemBuilder: (context, index) {
//                 final conversation = filteredConversations[index];
//                 return ListTile(
//                   leading: CircleAvatar(
//                     backgroundImage: NetworkImage(conversation['avatarUrl']!),
//                   ),
//                   title: Text(conversation['name']!),
//                   subtitle: Text(conversation['latestMessage']!),
//                   onTap: () {
//                     Navigator.push(
//                       context,
//                       MaterialPageRoute(
//                         builder: (context) =>
//                             ChatScreen(conversationName: conversation['name']!),
//                       ),
//                     );
//                   },
//                 );
//               },
//             ),
//           ),
//         ],
//       ),
//     );
//   }
// }

import 'package:flutter/material.dart';
import 'package:sportify_mobile/models/user_info.dart';
import 'package:sportify_mobile/services/account_service.dart';
import 'package:sportify_mobile/utils/constants.dart';
import 'chat_screen.dart';
import '../services/chat_service.dart'; // Import service để gọi API

class MessageScreen extends StatefulWidget {
  final String token;
  const MessageScreen({super.key, required this.token});

  @override
  State<MessageScreen> createState() => _MessageScreenState();
}

class _MessageScreenState extends State<MessageScreen> {
  List<Map<String, dynamic>> conversations = [];
  String searchQuery = '';
  bool isLoading = true;
  int? userId; // Lưu ID của user hiện tại

  @override
  void initState() {
    super.initState();
    fetchUserInfo(); // Lấy thông tin user trước
    // fetchChatRooms(); // Gọi API khi màn hình được tạo
  }

  Future<void> fetchUserInfo() async {
    try {
      UserInfo user = await AccountService().getUserInfo(widget.token);
      setState(() {
        userId = user.userId;
      });
      fetchChatRooms(); // Sau khi có userId, gọi API lấy danh sách chat
    } catch (error) {
      setState(() {
        isLoading = false;
      });
      print('Error fetching user info: $error');
    }
  }

  Future<void> fetchChatRooms() async {
    try {
      List<Map<String, dynamic>> chatRooms =
          await ChatService().getChatRooms(widget.token);
      setState(() {
        conversations = chatRooms;
        isLoading = false;
      });
    } catch (error) {
      setState(() {
        isLoading = false;
      });
      print('Error fetching chat rooms: $error');
    }
  }

  @override
  Widget build(BuildContext context) {
    final filteredConversations = conversations.where((conversation) {
      return conversation['otherUserName']
          .toLowerCase()
          .contains(searchQuery.toLowerCase());
    }).toList();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Messages'),
      ),
      body: isLoading
          ? const Center(
              child:
                  CircularProgressIndicator()) // Hiển thị loading khi đang lấy dữ liệu
          : Column(
              children: [
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: TextField(
                    decoration: const InputDecoration(
                      labelText: 'Search',
                      border: OutlineInputBorder(),
                      prefixIcon: Icon(Icons.search),
                    ),
                    onChanged: (value) {
                      setState(() {
                        searchQuery = value;
                      });
                    },
                  ),
                ),
                Expanded(
                  child: ListView.builder(
                    itemCount: filteredConversations.length,
                    itemBuilder: (context, index) {
                      final conversation = filteredConversations[index];
                      return ListTile(
                        leading: CircleAvatar(
                          backgroundImage: NetworkImage(
                              '$BASE_PATH_IMAGE/avatar/${conversation['otherUserAvatar']}'),
                        ),
                        title: Text(conversation['otherUserName']),
                        subtitle: Text(conversation['lastMessage'] ?? ''),
                        onTap: () {
                          if (userId != null) {
                            // Đảm bảo userId có giá trị trước khi truyền vào ChatScreen
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) => ChatScreen(
                                  conversationName:
                                      conversation['otherUserName'],
                                  token: '',
                                  roomId: conversation['roomId'],
                                  otherUserAvatar:
                                      conversation['otherUserAvatar'],
                                  userId: userId!,
                                ),
                              ),
                            );
                          } else {
                            print('User ID is null, cannot open chat.');
                          }
                        },
                      );
                    },
                  ),
                ),
              ],
            ),
    );
  }
}
