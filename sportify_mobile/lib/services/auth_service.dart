import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

class AuthService {
  final String _tokenKey = 'auth_token';

  // Lưu token vào local storage
  Future<void> saveToken(String token) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_tokenKey, token);
  }

  // Lấy token từ local storage
  Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_tokenKey);
  }

  // Xóa token khi logout
  Future<void> clearToken() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_tokenKey);
  }

  // Kiểm tra token có hết hạn không
  bool isTokenExpired(String token) {
    try {
      final parts = token.split('.');
      if (parts.length != 3) return true;

      final payload = jsonDecode(
          utf8.decode(base64Url.decode(base64Url.normalize(parts[1]))));
      final exp = payload['exp'];
      if (exp == null) return true;

      final currentTime = DateTime.now().millisecondsSinceEpoch ~/ 1000;
      return currentTime >= exp;
    } catch (e) {
      return true; // Token không hợp lệ thì coi như hết hạn
    }
  }

  // Kiểm tra người dùng đã đăng nhập chưa
  Future<bool> isLoggedIn() async {
    final token = await getToken();
    if (token == null || isTokenExpired(token)) {
      return false;
    }
    return true;
  }
}
