import 'package:http/http.dart' as http;
import 'package:stomp_dart_client/stomp_dart_client.dart';
import 'dart:convert';
import '../utils/constants.dart';

class ChatService {
  Future<List<Map<String, dynamic>>> getChatRooms(String token) async {
    final response = await http.get(
      Uri.parse('$BASE_URL$GET_CHATROOMS'),
      headers: {'Authorization': 'Bearer $token'},
    );

    if (response.statusCode == 200) {
      List<dynamic> jsonResponse = jsonDecode(response.body);
      return jsonResponse.cast<Map<String, dynamic>>();
    } else {
      throw Exception('Failed to load chat rooms');
    }
  }

//CHAT REALTIME
  StompClient? stompClient;
  Function(Map<String, dynamic>)? onMessageReceived;

  ChatService({this.onMessageReceived});

  /// Kết nối WebSocket
  void connect(String token, int roomId) {
    stompClient = StompClient(
      config: StompConfig.sockJS(
        url: '$BASE_URL/ws', // Lưu ý: SockJS yêu cầu kết nối qua HTTP
        onConnect: (StompFrame frame) {
          print('WebSocket connected!');
          subscribeToMessages(roomId);
        },
        beforeConnect: () async {
          print('Connecting to WebSocket...');
        },
        onWebSocketError: (dynamic error) => print('WebSocket Error: $error'),
      ),
    );

    stompClient?.activate();
  }

  /// Đăng ký lắng nghe tin nhắn mới từ WebSocket
  void subscribeToMessages(int roomId) {
    stompClient?.subscribe(
      destination: '/topic/messages/$roomId',
      callback: (StompFrame frame) {
        if (frame.body != null) {
          final Map<String, dynamic> message = jsonDecode(frame.body!);
          if (onMessageReceived != null) {
            onMessageReceived!(message);
          }
        }
      },
    );
  }

  /// Gửi tin nhắn qua WebSocket
  void sendMessage(int roomId, int senderId, String content) {
    if (stompClient != null && stompClient!.connected) {
      final message = {
        'senderId': senderId,
        'content': content,
      };
      stompClient!.send(
        destination: '/app/chat/$roomId',
        body: jsonEncode(message),
      );
    } else {
      print('WebSocket not connected!');
    }
  }

  /// Lấy lịch sử tin nhắn từ API
  Future<List<Map<String, dynamic>>> getMessages(
      String token, int roomId) async {
    final response = await http.get(
      Uri.parse('$BASE_URL/api/messages/history/$roomId'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
    );

    if (response.statusCode == 200) {
      List<dynamic> jsonResponse = jsonDecode(response.body);
      return jsonResponse.cast<Map<String, dynamic>>();
    } else {
      throw Exception('Failed to load messages');
    }
  }

  /// Đóng kết nối WebSocket
  void disconnect() {
    stompClient?.deactivate();
  }
}
