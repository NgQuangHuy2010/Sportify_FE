import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:sportify_mobile/screens/account_screen.dart';
import 'package:sportify_mobile/screens/explore_screen.dart';
import 'package:sportify_mobile/screens/message_screen.dart';
import 'package:sportify_mobile/screens/notification_screen.dart';
import 'package:sportify_mobile/services/auth_service.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final authService = AuthService();
  String? _token;
  int _selectedIndex = 0;
  late List<Widget> _pages;

  @override
  void initState() {
    super.initState();
    _loadToken();
  }

  Future<void> _loadToken() async {
    final token = await authService.getToken();
    if (token != null && !authService.isTokenExpired(token)) {
      setState(() {
        _token = token;
        _pages = [
          ExploreScreen(token: _token!),
          MessageScreen(token: _token!),
          NotificationScreen(token: _token!),
          AccountScreen(token: _token!),
        ];
      });
      print('Home Token: $_token');
    } else {
      // Token hết hạn hoặc không tồn tại => Xử lý logout hoặc điều hướng
      _handleTokenExpired();
    }
  }

  void _handleTokenExpired() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Session Expired'),
        content: const Text('Your session has expired. Please log in again.'),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              context.go('/login');
            },
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    // Kiểm tra token và trang để tránh lỗi
    if (_token == null || _pages.isEmpty) {
      return const Scaffold(
        body: Center(
            child: CircularProgressIndicator()), // Hiện vòng xoay khi chờ token
      );
    }
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Sportify',
          style: TextStyle(
              fontWeight: FontWeight.bold, fontSize: 25, color: Colors.white),
        ),
        backgroundColor: Colors.blueAccent,
      ),
      body: _pages[_selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        onTap: _onItemTapped,
        selectedItemColor: Colors.blue,
        unselectedItemColor: Colors.grey,
        backgroundColor: Colors.white,
        type: BottomNavigationBarType.fixed,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.explore),
            label: 'Explore',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.message),
            label: 'Message',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.notifications),
            label: 'Notification',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.account_circle_sharp),
            label: 'Account',
          ),
        ],
      ),
    );
  }
}
