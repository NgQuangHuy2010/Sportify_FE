import 'package:sportify_mobile/models/sport.dart';

class ListUser {
  final int userId;
  final String firstname;
  final String lastname;
  final String email;
  final String avatar;
  final List<Sport> sports;

  ListUser({
    required this.userId,
    required this.firstname,
    required this.lastname,
    required this.email,
    required this.avatar,
    required this.sports,
  });

  factory ListUser.fromJson(Map<String, dynamic> json) {
    return ListUser(
      userId: json['userId'],
      firstname: json['firstname'],
      lastname: json['lastname'],
      email: json['email'],
      avatar: json['avatar'] ?? '',
      sports: (json['sports'] as List)
          .map((sport) => Sport.fromJson(sport))
          .toList(),
    );
  }
}
