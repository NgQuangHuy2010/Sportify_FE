import 'package:flutter/material.dart';
import 'package:stomp_dart_client/stomp_dart_client.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});

  @override
  _ChatScreenState createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final TextEditingController roomIdController = TextEditingController();
  final TextEditingController userIdController = TextEditingController();
  final TextEditingController messageController = TextEditingController();
  List<Map<String, dynamic>> messages = [];
  StompClient? stompClient;
  bool isConnected = false;

  final String socketUrl = 'http://localhost:8080/ws';
  final String apiUrl = 'http://localhost:8080/api/messages';

  void connectToChat() {
    if (roomIdController.text.isNotEmpty) {
      stompClient = StompClient(
        config: StompConfig.sockJS(
          url: socketUrl,
          onConnect: onConnected,
          onWebSocketError: (dynamic error) => print('WebSocket Error: $error'),
        ),
      );
      stompClient!.activate();
    }
  }

  void onConnected(StompFrame frame) {
    setState(() {
      isConnected = true;
    });
    print('Connected to WebSocket!');

    stompClient!.subscribe(
      destination: '/topic/messages/${roomIdController.text}',
      callback: (StompFrame frame) {
        if (frame.body != null) {
          final message = jsonDecode(frame.body!);
          setState(() {
            messages.add(message);
          });
        }
      },
    );
  }

  void sendMessage() {
    if (stompClient != null &&
        isConnected &&
        messageController.text.isNotEmpty &&
        userIdController.text.isNotEmpty) {
      final message = {
        'senderId': int.tryParse(userIdController.text),
        'content': messageController.text,
      };

      stompClient!.send(
        destination: '/app/chat/${roomIdController.text}',
        body: jsonEncode(message),
      );

      messageController.clear();
      print('Message sent successfully!');
    }
  }

  Future<void> loadChatHistory() async {
    if (roomIdController.text.isNotEmpty) {
      try {
        final response = await http
            .get(Uri.parse('$apiUrl/history/${roomIdController.text}'));
        if (response.statusCode == 200) {
          setState(() {
            messages =
                List<Map<String, dynamic>>.from(jsonDecode(response.body));
          });
        }
      } catch (error) {
        print("Failed to load chat history: $error");
      }
    }
  }

  @override
  void dispose() {
    stompClient?.deactivate();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Chat Room')),
      body: Column(
        children: [
          TextField(
              controller: userIdController,
              decoration: const InputDecoration(labelText: 'User ID')),
          TextField(
              controller: roomIdController,
              decoration: const InputDecoration(labelText: 'Room ID')),
          ElevatedButton(
              onPressed: connectToChat, child: const Text('Connect')),
          ElevatedButton(
              onPressed: loadChatHistory, child: const Text('Load History')),
          Expanded(
            child: ListView.builder(
              itemCount: messages.length,
              itemBuilder: (context, index) {
                final msg = messages[index];
                return ListTile(
                  title: Text('User ${msg['senderId']}: ${msg['content']}'),
                );
              },
            ),
          ),
          Row(
            children: [
              Expanded(
                child: TextField(
                  controller: messageController,
                  decoration: const InputDecoration(labelText: 'Message'),
                ),
              ),
              IconButton(
                icon: const Icon(Icons.send),
                onPressed: sendMessage,
              ),
            ],
          ),
        ],
      ),
    );
  }
}
