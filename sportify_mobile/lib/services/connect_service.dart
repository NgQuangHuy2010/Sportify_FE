import 'dart:convert';

import 'package:http/http.dart' as http;
import '../utils/constants.dart';

class ConnectService {
  // Gửi lòi mời kết bạn:
  Future<void> sendConnectionRequest(int receiverId, String token) async {
    final url = Uri.parse('$BASE_URL/api/connections/send/$receiverId');

    try {
      final response = await http.post(url, headers: {
        'Authorization': 'Bearer $token',
      });

      if (response.statusCode == 200) {
        print('Connection request sent successfully!');
      } else {
        throw Exception('Failed to send connection request: ${response.body}');
      }
    } catch (e) {
      throw Exception('Error sending connection request: $e');
    }
  }

  Future<List<dynamic>> getPendingRequests(String token) async {
    final url = Uri.parse('$BASE_URL/api/connections/pending');

    try {
      final response = await http.get(
        url,
        headers: {'Authorization': 'Bearer $token'},
      );

      if (response.statusCode == 200) {
        return json.decode(response.body);
      } else {
        throw Exception('Failed to fetch pending requests: ${response.body}');
      }
    } catch (e) {
      throw Exception('Error fetching pending requests: $e');
    }
  }

  Future<void> acceptConnectionRequest(int requestId, String token) async {
    final url = Uri.parse('$BASE_URL/api/connections/accept/$requestId');

    try {
      final response = await http.post(url, headers: {
        'Authorization': 'Bearer $token',
      });

      if (response.statusCode == 200) {
        print('Connection request accepted!');
      } else {
        throw Exception(
            'Failed to accept connection request: ${response.body}');
      }
    } catch (e) {
      throw Exception('Error accepting connection request: $e');
    }
  }

  Future<void> declineConnectionRequest(int requestId, String token) async {
    final url = Uri.parse('$BASE_URL/api/connections/reject/$requestId');

    try {
      final response = await http.post(url, headers: {
        'Authorization': 'Bearer $token',
      });

      if (response.statusCode == 200) {
        print('Connection request rejected!');
      } else {
        throw Exception(
            'Failed to reject connection request: ${response.body}');
      }
    } catch (e) {
      throw Exception('Error rejecting connection request: $e');
    }
  }
}
