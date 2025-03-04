class Sport {
  final int id;
  final String sportName;
  final String imageUrl;

  Sport({
    required this.id,
    required this.sportName,
    required this.imageUrl,
  });

  factory Sport.fromJson(Map<String, dynamic> json) {
    return Sport(
      id: json['id'],
      sportName: json['sportName'],
      imageUrl: json['imageUrl'] ?? '',
    );
  }
}
