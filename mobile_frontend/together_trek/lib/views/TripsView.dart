import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'package:together_trek/api/TripWrapper.dart';
import 'package:together_trek/models/LoadedTripsModel.dart';
import 'package:together_trek/models/TripModel.dart';
import 'package:together_trek/models/UserModel.dart';
import 'package:together_trek/utils/DialogUtil.dart';
import 'package:together_trek/views/TripView.dart';

class TripsView extends StatefulWidget {
  _TripsViewState createState() => _TripsViewState();
}

class _TripsViewState extends State<TripsView> {
  LoadedTripsModel trips;

  void _saveTrips(List<TripModel> trips) {
    this.trips.resetTrips(trips);
    return;
  }

  @override
  Widget build(BuildContext context) {
    trips = context.watch<LoadedTripsModel>();
    UserModel user = context.read<UserModel>();
    int _toReverse = 1;
    return RefreshIndicator(
      child: ListView.builder(
          physics: BouncingScrollPhysics(),
          itemCount: trips.trips.length,
          itemBuilder: (BuildContext context, int index) {
            return Card(
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(3)),
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
                                  builder: (context) =>
                                      TripView(trip: trips.trips[index])));
                        },
                        child: ListTile(
                            title: Text(
                                trips.trips[index].destination.toString()))),
                  ],
                ));
          }),
      onRefresh: () async {
        List<TripModel> retrievedTrips =
            await getTrips().timeout(Duration(seconds: 15), onTimeout: () {
          showDialog(
              context: context,
              builder: (context) {
                return buildStandardDialog(context, "Network Error",
                    "There was an error retrieving trips from the server.");
              });
          _toReverse = 0;
          return this.trips.trips;
        }).catchError((err) {
          showDialog(
              context: context,
              builder: (context) {
                return buildStandardDialog(
                    context, "Network Error", err.toString());
              });
          _toReverse = 0;
          return this.trips.trips;
        });
        setState(() {
          if (_toReverse == 1) {
            _saveTrips(retrievedTrips);
          } else {
            _toReverse = 1;
          }
        });
        user.tripIds = await getTripsById(trips.trips, user.id);
      },
    );
  }
}
