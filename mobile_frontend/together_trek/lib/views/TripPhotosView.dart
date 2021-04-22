import 'package:flutter/material.dart';
import 'package:together_trek/models/TripModel.dart';

class TripPhotosView extends StatefulWidget {
  TripModel trip;

  TripPhotosView(TripModel trip) {
    this.trip = trip;
  }

  _TripPhotosViewState createState() => _TripPhotosViewState(trip);
}

class _TripPhotosViewState extends State<TripPhotosView> {
  TripModel trip;

  _TripPhotosViewState(TripModel trip) {
    this.trip = trip;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Photos"),
      ),
      body: Container(child: Text(trip.creatorId)),
    );
  }
}
