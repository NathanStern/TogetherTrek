import 'package:flutter/material.dart';

import 'package:together_trek/models/PostModel.dart';

class LoadedPostsModel extends ChangeNotifier {
  List<PostModel> posts = [];
  LoadedPostsModel({this.posts});

  LoadedPostsModel.empty() {
    this.posts = [];
  }

  void resetPosts(List<PostModel> posts) {
    this.posts = List.from(posts.reversed);
    notifyListeners();
  }

  void removePost(id) {
    for (var i = 0; i <= this.posts.length; i++) {
      if (this.posts[i].id == id) {
        this.posts.removeAt(i);
        break;
      }
    }
    notifyListeners();
  }
}
