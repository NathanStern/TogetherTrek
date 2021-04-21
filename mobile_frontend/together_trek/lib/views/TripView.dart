import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'package:together_trek/api/TripWrapper.dart';
import 'package:together_trek/models/LoadedTripsModel.dart';
import 'package:together_trek/models/TripModel.dart';
import 'package:together_trek/utils/DialogUtil.dart';
//import 'package:together_trek/views/AlertView.dart';
import 'package:together_trek/views/HomeView.dart';
import 'package:together_trek/views/TempProfileView.dart';

class TripView extends StatefulWidget {
  TripView({Key key, this.trip}) : super(key: key);

  TripModel trip;

  _TripViewState createState() => _TripViewState(trip: trip);
}

class _TripViewState extends State<TripView> {
  _TripViewState({this.trip});
  TripModel trip;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Trip"),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Text(
            "Start Date:",
            style: TextStyle(
                color: Colors.redAccent,
                fontStyle: FontStyle.normal,
                fontSize: 28.0),
          ),
          SizedBox(
            height: 10.0,
          ),
          Text(
            trip.startDate.substring(0, 10),
            style: TextStyle(
              fontSize: 22.0,
              fontStyle: FontStyle.italic,
              fontWeight: FontWeight.w300,
              color: Colors.black,
              letterSpacing: 2.0,
            ),
          ),
          Text(
            "End Date:",
            style: TextStyle(
                color: Colors.redAccent,
                fontStyle: FontStyle.normal,
                fontSize: 28.0),
          ),
          SizedBox(
            height: 10.0,
          ),
          Text(
            trip.endDate.substring(0, 10),
            style: TextStyle(
              fontSize: 22.0,
              fontStyle: FontStyle.italic,
              fontWeight: FontWeight.w300,
              color: Colors.black,
              letterSpacing: 2.0,
            ),
          ),
          Text(
            "Destination:",
            style: TextStyle(
                color: Colors.redAccent,
                fontStyle: FontStyle.normal,
                fontSize: 28.0),
          ),
          SizedBox(
            height: 10.0,
          ),
          Text(
            trip.destination.toString(),
            style: TextStyle(
              fontSize: 22.0,
              fontStyle: FontStyle.italic,
              fontWeight: FontWeight.w300,
              color: Colors.black,
              letterSpacing: 2.0,
            ),
          ),
          Padding(
              padding: const EdgeInsets.all(8.0),
              child: ElevatedButton(
                onPressed: () async {
                  requestJoinTrip(context, trip.id);
                },
                child: Text('Request to join'),
              ))
        ],
      ),
    );
  }
}
