import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:sportify_mobile/models/user_info.dart';
import 'package:sportify_mobile/services/account_service.dart';
import 'package:sportify_mobile/utils/constants.dart';
import 'chat_screen.dart';
import '../services/chat_service.dart';

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
  int? userId;
  late ChatService chatService;

  @override
  void initState() {
    super.initState();
    chatService = ChatService(onChatRoomsUpdated: updateChatRooms);
    fetchUserInfo();
  }

  Future<void> fetchUserInfo() async {
    try {
      UserInfo user = await AccountService().getUserInfo(widget.token);
      setState(() {
        userId = user.userId;
      });
      fetchChatRooms();
      chatService.connectForChatRooms(widget.token, userId!);
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

  void updateChatRooms(List<Map<String, dynamic>> updatedRooms) {
    setState(() {
      conversations = updatedRooms;
    });
  }

  @override
  void dispose() {
    chatService.disconnect();
    super.dispose();
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
          ? const Center(child: CircularProgressIndicator())
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
                      final isUnread =
                          conversation['lastMessageIsRead'] == false;
                      final lastMessageTime = conversation['lastMessageTime'];

                      String formatLastMessageTime(String dateTimeStr) {
                        final dateTime = DateTime.parse(dateTimeStr);
                        final now = DateTime.now();
                        if (dateTime.year == now.year &&
                            dateTime.month == now.month &&
                            dateTime.day == now.day) {
                          return DateFormat('HH:mm').format(dateTime);
                        } else {
                          return DateFormat('dd/MM/yyyy HH:mm')
                              .format(dateTime);
                        }
                      }

                      return ListTile(
                        leading: CircleAvatar(
                          backgroundImage: NetworkImage(
                            '$BASE_PATH_IMAGE/avatar/${conversation['otherUserAvatar']}',
                          ),
                        ),
                        title: Text(
                          conversation['otherUserName'],
                          style: TextStyle(
                            fontWeight:
                                isUnread ? FontWeight.bold : FontWeight.normal,
                          ),
                        ),
                        subtitle: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              conversation['lastMessage'] ?? '',
                              style: TextStyle(
                                fontWeight: isUnread
                                    ? FontWeight.bold
                                    : FontWeight.normal,
                              ),
                            ),
                            Text(
                              'Sent at: ${formatLastMessageTime(lastMessageTime)}',
                              style: const TextStyle(
                                  color: Colors.grey, fontSize: 12),
                            ),
                          ],
                        ),
                        trailing: isUnread
                            ? const Icon(Icons.notifications_active,
                                color: Colors.red)
                            : null,
                        onTap: () {
                          if (userId != null) {
                            setState(() {
                              conversations[index]['lastMessageIsRead'] = true;
                            });
                            chatService.markAllMessagesAsRead(
                                widget.token, conversation['roomId']);
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) => ChatScreen(
                                  conversationName:
                                      conversation['otherUserName'],
                                  token: widget.token,
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
                )
              ],
            ),
    );
  }
}
