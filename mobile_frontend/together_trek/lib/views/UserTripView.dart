import 'dart:io';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:together_trek/api/TripWrapper.dart';
import 'package:together_trek/models/DestinationModel.dart';
import 'package:together_trek/models/TripModel.dart';
import 'package:together_trek/models/UserModel.dart';
import 'package:together_trek/views/TripView.dart';

class UserTripView extends StatefulWidget {
  UserTripView({Key key}) : super(key: key);

  _UserTripViewState createState() => _UserTripViewState();
}

class _UserTripViewState extends State<UserTripView> {
  UserModel user;

  @override
  Widget build(BuildContext context) {
    user = context.watch<UserModel>();
    if (user == null) {
      return Scaffold(
        appBar: AppBar(title: Text("My Trips")),
        body: Container(child: Text("Invalid User")),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: Text("My Trips"),
      ),
      body: Container(
          child: ListView.builder(
              itemCount: this.user.tripIds.length,
              itemBuilder: (BuildContext context, int index) {
                return InkWell(
                    onTap: () {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) =>
                                  TripView(trip: this.user.tripIds[index])));
                    },
                    child: Card(
                        elevation: 5,
                        child: Text(
                            this.user.tripIds[index].destination.country +
                                ", " +
                                this.user.tripIds[index].destination.city)));
              })),
    );
  }
}
