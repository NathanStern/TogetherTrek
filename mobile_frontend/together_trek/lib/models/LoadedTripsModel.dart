import 'package:flutter/material.dart';

import 'package:together_trek/models/TripModel.dart';

class LoadedTripsModel extends ChangeNotifier {
  List<TripModel> trips = [];
  LoadedTripsModel({this.trips});

  LoadedTripsModel.empty() {
    this.trips = [];
  }

  void resetTrips(List<TripModel> trips) {
    this.trips = List.from(trips.reversed);
    notifyListeners();
  }

  void removeTrip(id) {
    for (var i = 0; i <= this.trips.length; i++) {
      if (this.trips[i].id == id) {
        this.trips.removeAt(i);
        break;
      }
    }
    notifyListeners();
  }
}
