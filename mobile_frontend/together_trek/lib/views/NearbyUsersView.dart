import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'package:together_trek/api/UserWrapper.dart';
import 'package:together_trek/models/LoadedTripsModel.dart';
import 'package:together_trek/models/UserModel.dart';
import 'package:together_trek/utils/DialogUtil.dart';
import 'package:together_trek/views/TripView.dart';
import 'package:together_trek/views/TempProfileView.dart';

class NearbyUsersView extends StatefulWidget {
  _NearbyUsersViewState createState() => _NearbyUsersViewState();
}

class _NearbyUsersViewState extends State<NearbyUsersView> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  UserModel user;
  Future<List<Map<String, dynamic>>> nearbyUsers;

  @override
  Widget build(BuildContext context) {
    print("test");
    user = context.watch<UserModel>();
    nearbyUsers = getNearbyUsers(user.id, "20");
    return FutureBuilder(
      future: nearbyUsers,
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          print("test2");
          return Scaffold(
            appBar: AppBar(
              title: Text("Nearby Users"),
            ),
            body: Column(
              children: <Widget>[
                Form(
                  key: _formKey,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      TextFormField(
                        decoration: const InputDecoration(
                          hintText: 'Enter a range',
                        ),
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Please enter a range';
                          }
                          return null;
                        },
                      ),
                      Padding(
                        padding: const EdgeInsets.symmetric(vertical: 16.0),
                        child: ElevatedButton(
                          onPressed: () async {
                            setState(() async {
                              nearbyUsers = getNearbyUsers(user.id, "20");
                            });
                          },
                          child: const Text('Submit'),
                        ),
                      ),
                    ],
                  ),
                ),
                Expanded(
                  child: ListView.builder(
                    physics: BouncingScrollPhysics(),
                    itemCount: snapshot.data.length,
                    itemBuilder: (BuildContext context, int index) {
                      return Card(
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(3)
                        ),
                        elevation: 2,
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            InkWell(
                              borderRadius: BorderRadius.circular(2.5),
                              enableFeedback: true,
                              splashColor: Colors.deepOrangeAccent,
                              onTap: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => TempProfileView(user: snapshot.data[index]['_id'])
                                  )
                                );
                              },
                              child: ListTile(title: Text(snapshot.data[index]['username']))
                            ),
                          ],
                        )
                      );
                    }
                  ),
                )
              ]
            )
          );
        } else {
          return Scaffold(
            appBar: AppBar(
              title: Text("Nearby Users"),
            ),
            body: Text(
              "Loading data..."
            )
          );
        }
      }
    );
  }
}
