import 'package:flutter/material.dart';
import '../utils/constants.dart';

class UserCard extends StatelessWidget {
  final String avatarUrl;
  final String name;
  final List<Map<String, String>>
      favoriteSports; // List of {id, sportName, imageSport}

  const UserCard({
    super.key,
    required this.avatarUrl,
    required this.name,
    required this.favoriteSports,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      elevation: 4,
      color: Colors.blue[50],
      margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            // CircleAvatar(
            //   radius: 50,
            //   backgroundImage: NetworkImage(avatarUrl),
            // ),
            const SizedBox(height: 12),
            Text(
              name,
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 8),
            Wrap(
              spacing: 8.0,
              children: favoriteSports.map((sport) {
                return Chip(
                  avatar: sport['imageSport'] != null
                      ? CircleAvatar(
                          backgroundImage: NetworkImage(
                              '$BASE_PATH_IMAGE/sports/${sport['imageSport']!}'),
                        )
                      : null,
                  label: Text(sport['sportName']!),
                );
              }).toList(),
            ),
            const SizedBox(height: 12),
            ElevatedButton(
              style: ButtonStyle(
                  backgroundColor: WidgetStatePropertyAll(Colors.blueAccent)),
              onPressed: () => _showRequestDialog(context),
              child: const Text(
                'Connect',
                style: TextStyle(fontSize: 20, color: Colors.white),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showRequestDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text('Send connection request to $name'),
          content: TextField(
            decoration: const InputDecoration(
              labelText: 'Message',
              border: OutlineInputBorder(),
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Send Request'),
            ),
          ],
        );
      },
    );
  }
}
