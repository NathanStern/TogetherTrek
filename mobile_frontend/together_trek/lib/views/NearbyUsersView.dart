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
  List<Map<String, dynamic>> nearbyUsers;

  // Future<List<Map<String, dynamic>>> getNearbyUserData(BuildContext context, String range) {
  //   user = context.watch<UserModel>();
  //   Future<List<Map<String, dynamic>>> result = getNearbyUsers(user.id, range);
  //   return result;
  // }

  Future<List<Map<String, dynamic>>> getNearbyUserData(BuildContext context, String range) => Future(() {
      return getNearbyUsers("60668e32e6ef250015be43d0", "20");
  });

  @override
  Widget build(BuildContext context) => FutureBuilder(
    future: getNearbyUserData(context, "20"),
    builder: (context, snapshot) {
      if (snapshot.hasData) {
        nearbyUsers = snapshot.data;
        // nearbyUsers = [{"username": "Ryan"}];
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
                            nearbyUsers = await getNearbyUsers(user.id, "20");
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
                  itemCount: nearbyUsers.length,
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
                                  builder: (context) => TempProfileView(user: nearbyUsers[index]['_id'])
                                )
                              );
                            },
                            child: ListTile(title: Text(nearbyUsers[index]['username']))
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
