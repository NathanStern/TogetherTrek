import 'package:together_trek/models/DestinationModel.dart';
import 'package:together_trek/models/TripPhotoModel.dart';
import 'package:flutter/material.dart';

class TripModel extends ChangeNotifier {
  String id;
  DestinationModel destination;
  String startDate;
  String endDate;
  String creatorId;
  int budget;
  List<dynamic> participantIds;
  List<dynamic> joinRequests;
  List<TripPhotoModel> tripPhotos;

  TripModel(
      {this.id,
      this.destination,
      this.startDate,
      this.endDate,
      this.creatorId,
//<<<<<<< HEAD
      //this.participantIds,
      this.joinRequests,
//=======
      this.budget,
      this.participantIds,
//>>>>>>> main
      this.tripPhotos});

  factory TripModel.fromJson(Map<String, dynamic> json) {
    return TripModel(
        id: json['_id'],
        creatorId: json['creator_id'],
        startDate: json['start_date'],
        //participantIds: json['participant_ids'],
        endDate: json['end_date'],
//<<<<<<< HEAD
        participantIds: json['participant_ids'] ?? [],
        joinRequests: json['join_requests'] ?? [],
//=======
        budget: json['budget'],
//>>>>>>> main
        destination: DestinationModel.fromJson(json['destination']));
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

  Map<String, dynamic> toJson() => {
        //'_id': this.id,
        'creator_id': this.creatorId,
        'start_date': this.startDate,
        'destination': this.destination,
        'end_date': this.endDate,
        'budget': this.budget,
        'participant_ids': this.participantIds,
        'join_requests': this.joinRequests
      };
}
