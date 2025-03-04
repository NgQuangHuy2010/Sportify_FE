import 'package:http/http.dart' as http;
import 'dart:convert';
import '../utils/constants.dart';

class ApiService {
  // Function to call the login API with username or email
  Future<Map<String, dynamic>> login(
      String usernameOrEmail, String password) async {
    final response = await http.post(
      Uri.parse('$BASE_URL$LOGIN_ENDPOINT'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'usernameOrEmail': usernameOrEmail,
        'password': password,
      }),
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body); // Login successful
    } else {
      return {
        'success': false,
        'message': 'Incorrect email or password',
      }; // Login failed
    }
  }
}
