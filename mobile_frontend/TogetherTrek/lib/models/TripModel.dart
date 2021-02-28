import 'package:TogetherTrek/models/TripPhotoModel.dart';
import 'package:flutter/material.dart';

class TripModel extends ChangeNotifier {
  String id;
  String destination;
  String startDate;
  String endDate;
  String creatorId;
  List<String> participantIds;
  List<TripPhotoModel> tripPhotos;

  TripModel(
      String id,
      String destination,
      String startDate,
      String endDate,
      String creatorId,
      List<String> participantIds,
      List<TripPhotoModel> tripPhotos) {
    this.id = id;
    this.destination = destination;
    this.startDate = startDate;
    this.endDate = endDate;
    this.creatorId = creatorId;
    this.participantIds = participantIds;
    this.tripPhotos = tripPhotos;

    notifyListeners();
  }

  // getters are implicit

  void setStartDate(String newDate) {
    this.startDate = newDate;
    notifyListeners();
  }

  void setEndDate(String newDate) {
    this.endDate = newDate;
    notifyListeners();
  }

  void addParticipant(String participantId) {
    this.participantIds.add(participantId);
  }
}
