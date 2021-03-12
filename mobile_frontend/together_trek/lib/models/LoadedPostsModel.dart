import 'package:flutter/material.dart';
import 'package:together_trek/models/PostModel.dart';

class LoadedPostsModel extends ChangeNotifier {
  List<PostModel> posts = [];
  LoadedPostsModel({this.posts});

  void resetPosts(List<PostModel> posts) {
    this.posts = List.from(posts.reversed);
    notifyListeners();
  }
}
