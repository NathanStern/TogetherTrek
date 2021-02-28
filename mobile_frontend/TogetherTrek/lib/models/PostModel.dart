import 'package:flutter/material.dart';
import 'package:http/http.dart';

class PostModel extends ChangeNotifier {
  String id;
  String authorId;
  String title;
  String description;
  String postDate;
  List<String> destinations;

  PostModel(String id, String authorId, String title, String description,
      String postDate, List<String> destinations) {
    this.id = id;
    this.authorId = authorId;
    this.title = title;
    this.description = description;
    this.postDate = postDate;
    this.destinations = destinations;

    notifyListeners();
  }

  // getters are implicit

  void setTitle(String newTitle) {
    this.title = newTitle;
    notifyListeners();
  }

  void setDescription(String newDesc) {
    this.description = newDesc;
    notifyListeners();
  }

  void addDestination(String newDest) {
    this.destinations.add(newDest);
    notifyListeners();
  }
}
