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

  Future<List<dynamic>> getOutgoingRequests(String token) async {
    final url = Uri.parse('$BASE_URL/api/connections/outgoing-requests');
    print('Service get outgoing request to url : $url');
    return [
      {
        "id": 101,
        "receiver": {
          "userId": 5,
          "firstname": "John",
          "lastname": "Doe",
          "avatar": "john_doe.jpg",
          "sports": [
            {"id": 1, "sportName": "Soccer", "imageUrl": "icon_soccer.png"},
            {
              "id": 2,
              "sportName": "Basketball",
              "imageUrl": "icon_basketball.png"
            }
          ]
        },
        "status": "PENDING",
        "sentAt": "2025-03-06T12:34:56.789Z"
      },
      {
        "id": 102,
        "receiver": {
          "userId": 6,
          "firstname": "Jane",
          "lastname": "Smith",
          "avatar": "jane_smith.jpg",
          "sports": [
            {"id": 3, "sportName": "Tennis", "imageUrl": "icon_tennis.png"}
          ]
        },
        "status": "PENDING",
        "sentAt": "2025-03-05T09:15:30.123Z"
      }
    ];
  }

  Future<void> cancelConnectionRequest(int requestId, String token) async {
    final url = Uri.parse('$BASE_URL/api/connections/cancel/$requestId');
    print('Service cancel request to url : $url');
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
