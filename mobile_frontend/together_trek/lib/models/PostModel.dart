import 'dart:convert';

import 'package:together_trek/models/DestinationModel.dart';

class PostModel {
  String id;
  String authorId;
  String title;
  String description;
  String postDate;
  List<DestinationModel> destinations;

  PostModel(
      {this.id,
      this.authorId,
      this.title,
      this.description,
      this.postDate,
      this.destinations});

  factory PostModel.fromJson(Map<String, dynamic> json) {
    List<DestinationModel> dests = [];

    for (int i = 0; i < json['destinations'].length; i++) {
      dests.add(new DestinationModel.fromJson(json['destinations'][i]));
    }
    return PostModel(
        id: json['_id'],
        authorId: json['author_id'] ?? "null",
        title: json['title'],
        description: json['description'],
        postDate: json['post_date'],
        destinations: dests);
  }

  // getters are implicit

  void setTitle(String newTitle) {
    this.title = newTitle;
  }

  void setDescription(String newDesc) {
    this.description = newDesc;
  }

  void addDestination(DestinationModel newDest) {
    this.destinations.add(newDest);
  }

  Map<String, dynamic> toJson() => {
        //'_id': this.id,
        'author_id': this.authorId,
        'title': this.title,
        'description': this.description,
        'post_date': this.postDate,
        'destinations': this.destinations.toList()
      };
}
