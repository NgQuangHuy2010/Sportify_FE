import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:sportify_mobile/models/listUser.dart';
import 'package:sportify_mobile/utils/constants.dart';

class UserService {
  final String baseUrl;

  UserService({required this.baseUrl});

  Future<List<ListUser>> fetchUsers(String token) async {
    final response = await http.get(
      Uri.parse('$baseUrl$GET_USERS_EXPLORE'),
      headers: {
        'Authorization': 'Bearer $token',
      },
    );
    // print(token);
    print('$baseUrl$GET_USERS_EXPLORE');

    if (response.statusCode == 200) {
      List<dynamic> data = jsonDecode(response.body);
      // print(data);
      return data.map((json) => ListUser.fromJson(json)).toList();
    } else {
      throw Exception('Failed to load users');
    }
  }
}
