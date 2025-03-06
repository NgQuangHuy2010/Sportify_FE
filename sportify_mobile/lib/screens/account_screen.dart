//

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:sportify_mobile/utils/constants.dart';
import '../services/auth_service.dart';
import '../services/account_service.dart';
import '../models/user_info.dart';

class AccountScreen extends StatefulWidget {
  final String token; // Nhận token từ màn hình trước

  const AccountScreen({super.key, required this.token});

  @override
  State<AccountScreen> createState() => _AccountScreenState();
}

class _AccountScreenState extends State<AccountScreen> {
  final AuthService _authService = AuthService();
  UserInfo? userInfo; // Đối tượng lưu thông tin user

  @override
  void initState() {
    super.initState();
    fetchUserInfo(); // Gọi API khi màn hình load
  }

  /// Hàm gọi API lấy thông tin user
  Future<void> fetchUserInfo() async {
    try {
      UserInfo user = await AccountService().getUserInfo(widget.token);
      setState(() {
        userInfo = user;
      });
    } catch (e) {
      print('🚨 Lỗi khi lấy thông tin user: $e');
    }
  }

  /// Hàm logout
  void _logout() async {
    await _authService.clearToken();
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Logged out successfully')),
    );
    context.go('/login'); // Quay về màn hình login
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Account & Settings'),
      ),
      body: userInfo == null
          ? const Center(child: CircularProgressIndicator()) // Loading state
          : ListView(
              padding: const EdgeInsets.all(16.0),
              children: [
                CircleAvatar(
                  radius: 50,
                  backgroundImage: userInfo != null && userInfo!.avatar != null
                      ? NetworkImage(
                          '$BASE_PATH_IMAGE/avatar/${userInfo!.avatar}')
                      : const NetworkImage('https://via.placeholder.com/150'),
                ),
                const SizedBox(height: 16),
                Text(
                  '${userInfo!.firstname} ${userInfo!.lastname}', // Hiển thị tên user
                  style: const TextStyle(
                      fontSize: 24, fontWeight: FontWeight.bold),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 8),
                Text(
                  userInfo!.email, // Hiển thị email user
                  style: const TextStyle(fontSize: 16, color: Colors.grey),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 24),
                ListTile(
                  leading: const Icon(Icons.person),
                  title: const Text('Edit Profile'),
                  onTap: () {},
                ),
                ListTile(
                  leading: const Icon(Icons.lock),
                  title: const Text('Change Password'),
                  onTap: () {},
                ),
                ListTile(
                  leading: const Icon(Icons.notifications),
                  title: const Text('Notification Settings'),
                  onTap: () {},
                ),
                ListTile(
                  leading: const Icon(Icons.logout),
                  title: const Text('Logout'),
                  onTap: () {
                    showDialog(
                      context: context,
                      builder: (BuildContext context) {
                        return AlertDialog(
                          title: const Text('Logout'),
                          content:
                              const Text('Are you sure you want to log out?'),
                          actions: [
                            TextButton(
                              onPressed: () => Navigator.pop(context),
                              child: const Text('Cancel'),
                            ),
                            TextButton(
                              onPressed: () {
                                Navigator.pop(context);
                                _logout();
                              },
                              child: const Text('Logout'),
                            ),
                          ],
                        );
                      },
                    );
                  },
                ),
              ],
            ),
    );
  }
}
