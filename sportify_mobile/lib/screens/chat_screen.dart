// lib/screens/chat_screen.dart
import 'package:flutter/material.dart';

class ChatScreen extends StatefulWidget {
  final String conversationName;

  const ChatScreen({super.key, required this.conversationName});

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final TextEditingController _messageController = TextEditingController();
  final List<Map<String, String>> messages = [
    {
      'sender': 'Nguyen A',
      'avatar': 'https://via.placeholder.com/150',
      'text': 'Hi there!'
    },
    {
      'sender': 'You',
      'avatar': 'https://via.placeholder.com/150',
      'text': 'Hello! How are you?'
    },
    {
      'sender': 'Nguyen A',
      'avatar': 'https://via.placeholder.com/150',
      'text': 'Im good, thanks. What about you?'
    },
    {
      'sender': 'You',
      'avatar': 'https://via.placeholder.com/150',
      'text': 'Doing great. Are we playing football this weekend?'
    },
    {
      'sender': 'Nguyen A',
      'avatar': 'https://via.placeholder.com/150',
      'text': 'Yes, Im in. What time?'
    },
  ];

  void _sendMessage() {
    final messageText = _messageController.text.trim();
    if (messageText.isNotEmpty) {
      setState(() {
        messages.add({
          'sender': 'You',
          'avatar': 'https://via.placeholder.com/150',
          'text': messageText,
        });
        _messageController.clear();
      });
    }
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
            child: ListView.builder(
              itemCount: messages.length,
              itemBuilder: (context, index) {
                final message = messages[index];
                return Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    CircleAvatar(
                      backgroundImage: NetworkImage(message['avatar']!),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Container(
                        margin: const EdgeInsets.symmetric(vertical: 4),
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: message['sender'] == 'You'
                              ? Colors.blue[100]
                              : Colors.grey[200],
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              message['sender']!,
                              style:
                                  const TextStyle(fontWeight: FontWeight.bold),
                            ),
                            const SizedBox(height: 4),
                            Text(message['text']!),
                          ],
                        ),
                      ),
                    ),
                  ],
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
