import 'package:flutter/material.dart';
import 'chat_screen.dart';

class MessageScreen extends StatefulWidget {
  const MessageScreen({super.key});

  @override
  State<MessageScreen> createState() => _MessageScreenState();
}

class _MessageScreenState extends State<MessageScreen> {
  final List<Map<String, String>> conversations = [
    {
      'avatarUrl': 'https://via.placeholder.com/150',
      'name': 'Nguyen A',
      'latestMessage': 'Hey, how are you?'
    },
    {
      'avatarUrl': 'https://via.placeholder.com/150',
      'name': 'Football Lovers Group',
      'latestMessage': 'Match this weekend?'
    },
    {
      'avatarUrl': 'https://via.placeholder.com/150',
      'name': 'Tran B',
      'latestMessage': 'See you tomorrow!'
    },
  ];

  String searchQuery = '';

  @override
  Widget build(BuildContext context) {
    final filteredConversations = conversations.where((conversation) {
      return conversation['name']!
          .toLowerCase()
          .contains(searchQuery.toLowerCase());
    }).toList();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Messages'),
      ),
      body: Column(
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
                    backgroundImage: NetworkImage(conversation['avatarUrl']!),
                  ),
                  title: Text(conversation['name']!),
                  subtitle: Text(conversation['latestMessage']!),
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) =>
                            ChatScreen(conversationName: conversation['name']!),
                      ),
                    );
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
