import 'package:together_trek/models/DestinationModel.dart';
import 'package:together_trek/models/TripPhotoModel.dart';
import 'package:flutter/material.dart';

class TripModel extends ChangeNotifier {
  String id;
  DestinationModel destination;
  String startDate;
  String endDate;
  String creatorId;
  List<dynamic> participantIds;
  List<dynamic> joinRequests;
  List<TripPhotoModel> tripPhotos;

  TripModel(
      {this.id,
      this.destination,
      this.startDate,
      this.endDate,
      this.creatorId,
      this.participantIds,
      this.joinRequests,
      this.tripPhotos});

  factory TripModel.fromJson(Map<String, dynamic> json) {
    return TripModel(
        id: json['_id'],
        creatorId: json['creator_id'],
        startDate: json['start_date'],
        endDate: json['end_date'],
        participantIds: json['participant_ids'] ?? [],
        joinRequests: json['join_requests'] ?? [],
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
        'participant_ids': this.participantIds,
        'join_requests': this.joinRequests
      };
}
