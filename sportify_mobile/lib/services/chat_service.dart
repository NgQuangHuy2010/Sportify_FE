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
  Function(List<Map<String, dynamic>>)? onChatRoomsUpdated;
  ChatService({this.onMessageReceived, this.onChatRoomsUpdated});

  /// Kết nối WebSocket (dành cho MessageScreen)
  void connectForChatRooms(String token, int userId) {
    stompClient = StompClient(
      config: StompConfig.sockJS(
        url: '$BASE_URL/ws',
        onConnect: (StompFrame frame) {
          print('WebSocket connected for chat rooms!');
          subscribeToChatRooms(userId);
        },
        beforeConnect: () async {
          print('Connecting to WebSocket for chat rooms...');
        },
        onWebSocketError: (dynamic error) => print('WebSocket Error: $error'),
      ),
    );
    stompClient?.activate();
  }

  /// Đăng ký lắng nghe danh sách phòng chat cập nhật
  void subscribeToChatRooms(int userId) {
    print('subscribe to chatrooms with userId:  $userId');
    stompClient?.subscribe(
      destination: '/topic/chatrooms/$userId',
      callback: (StompFrame frame) {
        if (frame.body != null) {
          final List<dynamic> updatedChatRooms = jsonDecode(frame.body!);
          // 👉 Log ra thông báo khi danh sách phòng thay đổi
          print('🔔 Danh sách phòng chat đã thay đổi! Số phòng: ');

          if (updatedChatRooms.isNotEmpty) {
            print('Rooms updated');
            final firstRoom = updatedChatRooms[0];
            print('Phòng đầu tiên: ${firstRoom['roomId']}');
            print('Phòng đầu tiên: ${firstRoom['lastMessage']}');
          } else {
            print('⚠️ Không có phòng nào trong danh sách.');
          }
          if (onChatRoomsUpdated != null) {
            onChatRoomsUpdated!(updatedChatRooms.cast<Map<String, dynamic>>());
          }
        }
      },
    );
  }

  /// Kết nối WebSocket (dành cho ChatScreen)
  void connectForMessages(String token, int roomId) {
    stompClient = StompClient(
      config: StompConfig.sockJS(
        url: '$BASE_URL/ws',
        onConnect: (StompFrame frame) {
          print('WebSocket connected for messages!');
          subscribeToMessages(roomId);
        },
        beforeConnect: () async {
          print('Connecting to WebSocket for messages...');
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

  /// Đánh dấu đã đọc toàn bộ tin nhắn trong phòng chat
  Future<void> markAllMessagesAsRead(String token, int chatRoomId) async {
    final url = Uri.parse('$BASE_URL/api/messages/mark-read/$chatRoomId');

    try {
      final response = await http.put(
        url,
        headers: {
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        print('Đã đánh dấu đã đọc : $chatRoomId');
      } else {
        print('Lỗi khi đánh dấu đã đọc: ${response.statusCode}');
      }
    } catch (e) {
      print('Lỗi kết nối API đánh dấu đã đọc: $e');
    }
  }
}
