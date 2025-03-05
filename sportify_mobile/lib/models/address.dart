class Address {
  final String ward;
  final String district;
  final String city;
  final String no;

  Address({
    required this.ward,
    required this.district,
    required this.city,
    required this.no,
  });

  factory Address.fromJson(Map<String, dynamic> json) {
    return Address(
      ward: json['ward'],
      district: json['district'],
      city: json['city'],
      no: json['no'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'ward': ward,
      'district': district,
      'city': city,
      'no': no,
    };
  }
}
