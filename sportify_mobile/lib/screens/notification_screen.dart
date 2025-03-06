import 'package:flutter/material.dart';
import '../services/connect_service.dart';
import '../utils/constants.dart';

class NotificationScreen extends StatefulWidget {
  final String token;

  const NotificationScreen({super.key, required this.token});

  @override
  State<NotificationScreen> createState() => _NotificationScreenState();
}

class _NotificationScreenState extends State<NotificationScreen> {
  final connectService = ConnectService();
  late Future<List<dynamic>> pendingRequests;

  @override
  void initState() {
    super.initState();
    pendingRequests = connectService.getPendingRequests(widget.token);
  }

  void _handleAccept(int requestId) async {
    try {
      await connectService.acceptConnectionRequest(requestId, widget.token);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Connection request accepted successfully!'),
          backgroundColor: Colors.green,
        ),
      );
      setState(() {
        pendingRequests = connectService.getPendingRequests(widget.token);
      });
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Failed to accept request: $e'),
          backgroundColor: Colors.red,
        ),
      );
    }
  }

  void _handleDecline(int requestId) async {
    try {
      await connectService.declineConnectionRequest(requestId, widget.token);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Connection request declined successfully!'),
          backgroundColor: Colors.orange,
        ),
      );
      setState(() {
        pendingRequests = connectService.getPendingRequests(widget.token);
      });
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Failed to decline request: $e'),
          backgroundColor: Colors.red,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Connection Requests')),
      body: FutureBuilder<List<dynamic>>(
        future: pendingRequests,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else {
            final requests = snapshot.data ?? [];
            return ListView.builder(
              itemCount: requests.length,
              itemBuilder: (context, index) {
                final request = requests[index];
                final sender = request['sender'];
                return Card(
                  margin: const EdgeInsets.all(8.0),
                  child: ListTile(
                    leading: CircleAvatar(
                      backgroundImage: NetworkImage(
                        '$BASE_PATH_IMAGE/avatar/${sender['avatar']}',
                      ),
                    ),
                    title: Text('${sender['firstname']} ${sender['lastname']}'),
                    subtitle: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Sports: ${sender['sports'].map((sport) => sport['sportName']).join(', ')}',
                        ),
                        Text('Sent at: ${request['sentAt']}'),
                      ],
                    ),
                    trailing: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        IconButton(
                          icon: const Icon(Icons.check, color: Colors.green),
                          onPressed: () => _handleAccept(request['id']),
                        ),
                        IconButton(
                          icon: const Icon(Icons.close, color: Colors.red),
                          onPressed: () => _handleDecline(request['id']),
                        ),
                      ],
                    ),
                  ),
                );
              },
            );
          }
        },
      ),
    );
  }
}
