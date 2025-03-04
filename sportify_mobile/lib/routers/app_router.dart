import 'package:go_router/go_router.dart';
import 'package:sportify_mobile/screens/home.dart';
import 'package:sportify_mobile/screens/login.dart';
import 'package:sportify_mobile/services/auth_service.dart';

GoRouter router() {
  final AuthService authService = AuthService();

  return GoRouter(
    initialLocation: '/login',
    routes: [
      GoRoute(
        path: '/login',
        builder: (context, state) => const LoginScreen(),
      ),
      GoRoute(
        path: '/',
        builder: (context, state) => const HomeScreen(),
      ),
    ],
    redirect: (context, state) async {
      final isLoggedIn = await authService.isLoggedIn();
      final isLoggingIn = state.matchedLocation == '/login';

      // Nếu chưa đăng nhập và không ở trang login, chuyển về login
      if (!isLoggedIn && !isLoggingIn) {
        return '/login';
      }
      // Nếu đã đăng nhập mà đang ở trang login, chuyển về home
      else if (isLoggedIn && isLoggingIn) {
        return '/';
      }
      return null; // Không cần redirect
    },
  );
}
