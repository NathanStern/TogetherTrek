import 'package:together_trek/models/DestinationModel.dart';
import 'package:together_trek/models/ExpenseModel.dart';
import 'package:together_trek/models/TripPhotoModel.dart';
import 'package:flutter/material.dart';

class TripModel extends ChangeNotifier {
  String id;
  DestinationModel destination;
  String startDate;
  String endDate;
  String creatorId;
  int budget;
  num total_expenses;
  num expense_per_person;
  List<dynamic> participantIds;
  List<dynamic> expenses;
  //List<ExpenseModel> expenses;
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
      this.total_expenses,
      this.expense_per_person,
//=======
      this.budget,
      this.participantIds,
      this.expenses,
//>>>>>>> main
      this.tripPhotos});

  factory TripModel.fromJson(Map<String, dynamic> json) {
    return TripModel(
        id: json['_id'],
        creatorId: json['creator_id'],
        startDate: json['start_date'],
        expenses: json['expenses'],
        //expenses: ExpenseModel.fromJson(json['expenses']) ?? [],
        //participantIds: json['participant_ids'],
        endDate: json['end_date'],
        participantIds: json['participant_ids'] ?? [],
        joinRequests: json['join_requests'] ?? [],
        budget: json['budget'],
        total_expenses: json['total_expenses'],
        expense_per_person: json['expense_per_person'],

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
        'expenses': this.expenses,
        'budget': this.budget,
        'total_expenses': this.total_expenses,
        'expense_per_person': this.expense_per_person,
        'participant_ids': this.participantIds,
        'join_requests': this.joinRequests
      };
}
