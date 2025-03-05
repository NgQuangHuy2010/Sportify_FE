class ConnectSetting {
  final String? weekDay;
  final String? fromTime;
  final String? toTime;
  final int? ageMax;
  final int? ageMin;
  final String genderFind;
  final int status;

  ConnectSetting({
    required this.weekDay,
    required this.fromTime,
    required this.toTime,
    required this.ageMax,
    required this.ageMin,
    required this.genderFind,
    required this.status,
  });

  factory ConnectSetting.fromJson(Map<String, dynamic> json) {
    return ConnectSetting(
      weekDay: json['weekDay'],
      fromTime: json['fromTime'],
      toTime: json['toTime'],
      ageMax: json['ageMax'],
      ageMin: json['ageMin'],
      genderFind: json['genderFind'],
      status: json['status'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'weekDay': weekDay,
      'fromTime': fromTime,
      'toTime': toTime,
      'ageMax': ageMax,
      'ageMin': ageMin,
      'genderFind': genderFind,
      'status': status,
    };
  }
}
