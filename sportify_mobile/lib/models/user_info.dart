import 'package:sportify_mobile/models/address.dart';
import 'package:sportify_mobile/models/connect_setting.dart';

class UserInfo {
  final int userId;
  final String firstname;
  final String lastname;
  final String email;
  final String birthday;
  final String phone;
  final String avatar;
  final String bio;
  final String gender;
  final List<int> sports;
  final Address address;
  final ConnectSetting connectSetting;

  UserInfo({
    required this.userId,
    required this.firstname,
    required this.lastname,
    required this.email,
    required this.birthday,
    required this.phone,
    required this.avatar,
    required this.bio,
    required this.gender,
    required this.sports,
    required this.address,
    required this.connectSetting,
  });

  factory UserInfo.fromJson(Map<String, dynamic> json) {
    return UserInfo(
      userId: json['userId'],
      firstname: json['firstname'],
      lastname: json['lastname'],
      email: json['email'],
      birthday: json['birthday'],
      phone: json['phone'],
      avatar: json['avatar'],
      bio: json['bio'],
      gender: json['gender'],
      sports: List<int>.from(json['sports']),
      address: Address.fromJson(json['address']),
      connectSetting: ConnectSetting.fromJson(json['connectSetting']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'userId': userId,
      'firstname': firstname,
      'lastname': lastname,
      'email': email,
      'birthday': birthday,
      'phone': phone,
      'avatar': avatar,
      'bio': bio,
      'gender': gender,
      'sports': sports,
      'address': address.toJson(),
      'connectSetting': connectSetting.toJson(),
    };
  }

  UserInfo copyWith({
    int? userId,
    String? firstname,
    String? lastname,
    String? email,
    String? birthday,
    String? phone,
    String? avatar,
    String? bio,
    String? gender,
    List<int>? sports,
    Address? address,
    ConnectSetting? connectSetting,
  }) {
    return UserInfo(
      userId: userId ?? this.userId,
      firstname: firstname ?? this.firstname,
      lastname: lastname ?? this.lastname,
      email: email ?? this.email,
      birthday: birthday ?? this.birthday,
      phone: phone ?? this.phone,
      avatar: avatar ?? this.avatar,
      bio: bio ?? this.bio,
      gender: gender ?? this.gender,
      sports: sports ?? this.sports,
      address: address ?? this.address,
      connectSetting: connectSetting ?? this.connectSetting,
    );
  }
}
