import 'package:http/http.dart' as http;
import 'dart:convert';
import '../models/user_info.dart';
import '../utils/constants.dart';

class AccountService {
  /// Lấy thông tin user từ API
  Future<UserInfo> getUserInfo(String token) async {
    final response = await http.get(
      Uri.parse('$BASE_URL/api/info-user'),
      headers: {'Authorization': 'Bearer $token'},
    );

    if (response.statusCode == 200) {
      return UserInfo.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Failed to load user info');
    }
  }
}
