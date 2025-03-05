// lib/screens/explore_screen.dart
import 'package:flutter/material.dart';
import 'package:sportify_mobile/models/listUser.dart';
import 'package:sportify_mobile/services/user_service.dart';
import 'package:sportify_mobile/widgets/user_card.dart';
import '../utils/constants.dart';

class ExploreScreen extends StatefulWidget {
  final String token;

  const ExploreScreen({super.key, required this.token});

  @override
  State<ExploreScreen> createState() => _ExploreScreenState();
}

class _ExploreScreenState extends State<ExploreScreen> {
  late Future<List<ListUser>> futureUsers;
  final userService = UserService(baseUrl: BASE_URL);

  @override
  void initState() {
    super.initState();
    futureUsers = userService.fetchUsersToExplore(widget.token);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Explore Users')),
      body: FutureBuilder<List<ListUser>>(
        future: futureUsers,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else {
            final users = snapshot.data ?? [];
            return ListView.builder(
              itemCount: users.length,
              itemBuilder: (context, index) {
                final user = users[index];
                return UserCard(
                  avatar: user.avatar,
                  name: '${user.firstname} ${user.lastname}',
                  favoriteSports: user.sports
                      .map((sport) => {
                            'id': sport.id.toString(),
                            'sportName': sport.sportName,
                            'imageSport': sport.imageUrl,
                          })
                      .toList(),
                );
              },
            );
          }
        },
      ),
    );
  }
}
