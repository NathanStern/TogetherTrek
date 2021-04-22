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
  List<Map<String, dynamic>> nearbyUsers = [{"username": "Ryan"}];

  @override
  Widget build(BuildContext context) {
    user = context.watch<UserModel>();

    List<String> litems = [];
    final TextEditingController eCtrl = new TextEditingController();

    return Scaffold(
      extendBodyBehindAppBar: true,
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
                    hintText: 'Enter your email',
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter some text';
                    }
                    return null;
                  },
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 16.0),
                  child: ElevatedButton(
                    onPressed: () async {
                      List<Map<String, dynamic>> result = await getNearbyUsers(user.id, "20").timeout(
                        Duration(seconds: 15), onTimeout: () {
                        showDialog(
                            context: context,
                            builder: (context) {
                              return buildStandardDialog(context, "Network Error",
                                  "There was an error retrieving users from the server.");
                            }
                        );
                      },
                    ).catchError((err) {
                        showDialog(
                            context: context,
                            builder: (context) {
                              return buildStandardDialog(
                                  context, "Network Error", err.toString());
                            }
                        );
                      });
                      setState(() {
                        nearbyUsers = result;
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
  }
}
