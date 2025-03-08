// import 'package:flutter/material.dart';
// import 'package:sportify_mobile/models/listUser.dart';
// import 'package:sportify_mobile/services/user_service.dart';
// import 'package:sportify_mobile/widgets/user_card.dart';
// import '../utils/constants.dart';

// class ExploreScreen extends StatefulWidget {
//   final String token;

//   const ExploreScreen({super.key, required this.token});

//   @override
//   State<ExploreScreen> createState() => _ExploreScreenState();
// }

// class _ExploreScreenState extends State<ExploreScreen> {
//   late Future<List<ListUser>> futureUsers;
//   List<ListUser> users = [];
//   List<ListUser> visibleUsers = [];
//   final int loadBatchSize = 10;
//   int loadedCount = 0;
//   final ScrollController _scrollController = ScrollController();
//   final userService = UserService(baseUrl: BASE_URL);

//   @override
//   void initState() {
//     super.initState();
//     futureUsers = userService.fetchUsersToExplore(widget.token);
//     futureUsers.then((fetchedUsers) {
//       setState(() {
//         users = fetchedUsers;
//         _loadMoreUsers();
//       });
//     });

//     _scrollController.addListener(() {
//       if (_scrollController.position.pixels ==
//           _scrollController.position.maxScrollExtent) {
//         _loadMoreUsers();
//       }
//     });
//   }

//   void _loadMoreUsers() {
//     setState(() {
//       final nextBatch = users.skip(loadedCount).take(loadBatchSize).toList();
//       visibleUsers.addAll(nextBatch);
//       loadedCount += nextBatch.length;
//     });
//   }

//   @override
//   void dispose() {
//     _scrollController.dispose();
//     super.dispose();
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(title: const Text('Explore Users')),
//       body: FutureBuilder<List<ListUser>>(
//         future: futureUsers,
//         builder: (context, snapshot) {
//           if (snapshot.connectionState == ConnectionState.waiting) {
//             return const Center(child: CircularProgressIndicator());
//           } else if (snapshot.hasError) {
//             return Center(child: Text('Error: ${snapshot.error}'));
//           } else {
//             return ListView.builder(
//               controller: _scrollController,
//               itemCount:
//                   visibleUsers.length + (loadedCount < users.length ? 1 : 0),
//               itemBuilder: (context, index) {
//                 if (index < visibleUsers.length) {
//                   final user = visibleUsers[index];
//                   return UserCard(
//                     token: widget.token,
//                     receiverId: user.userId,
//                     avatar: user.avatar,
//                     name: '${user.firstname} ${user.lastname}',
//                     favoriteSports: user.sports
//                         .map((sport) => {
//                               'id': sport.id.toString(),
//                               'sportName': sport.sportName,
//                               'imageSport': sport.imageUrl,
//                             })
//                         .toList(),
//                   );
//                 } else {
//                   return const Center(
//                     child: Padding(
//                       padding: EdgeInsets.all(16),
//                       child: CircularProgressIndicator(),
//                     ),
//                   );
//                 }
//               },
//             );
//           }
//         },
//       ),
//     );
//   }
// }

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
  List<ListUser> users = [];
  List<ListUser> visibleUsers = [];
  final int loadBatchSize = 10;
  int loadedCount = 0;
  final ScrollController _scrollController = ScrollController();
  final userService = UserService(baseUrl: BASE_URL);

  @override
  void initState() {
    super.initState();
    futureUsers = userService.fetchUsersToExplore(widget.token);
    futureUsers.then((fetchedUsers) {
      setState(() {
        users = fetchedUsers;
        _loadMoreUsers();
      });
    });

    _scrollController.addListener(() {
      if (_scrollController.position.pixels ==
          _scrollController.position.maxScrollExtent) {
        _loadMoreUsers();
      }
    });
  }

  void _loadMoreUsers() {
    setState(() {
      final nextBatch = users.skip(loadedCount).take(loadBatchSize).toList();
      visibleUsers.addAll(nextBatch);
      loadedCount += nextBatch.length;
    });
  }

  void _removeUser(int userId) {
    setState(() {
      users.removeWhere((user) => user.userId == userId);
      visibleUsers.removeWhere((user) => user.userId == userId);
    });

    // Giữ vị trí scroll
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.jumpTo(_scrollController.position.pixels);
      }
    });
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
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
            return ListView.builder(
              controller: _scrollController,
              itemCount:
                  visibleUsers.length + (loadedCount < users.length ? 1 : 0),
              itemBuilder: (context, index) {
                if (index < visibleUsers.length) {
                  final user = visibleUsers[index];
                  return UserCard(
                    token: widget.token,
                    receiverId: user.userId,
                    avatar: user.avatar,
                    name: '${user.firstname} ${user.lastname}',
                    favoriteSports: user.sports
                        .map((sport) => {
                              'id': sport.id.toString(),
                              'sportName': sport.sportName,
                              'imageSport': sport.imageUrl,
                            })
                        .toList(),
                    onConnectSuccess: () => _removeUser(
                        user.userId), // Xử lý khi kết nối thành công
                  );
                } else {
                  return const Center(
                    child: Padding(
                      padding: EdgeInsets.all(16),
                      child: CircularProgressIndicator(),
                    ),
                  );
                }
              },
            );
          }
        },
      ),
    );
  }
}
