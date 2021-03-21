import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:together_trek/api/PostWrapper.dart';
import 'package:together_trek/models/LoadedPostsModel.dart';
import 'package:together_trek/models/PostModel.dart';
import 'package:together_trek/utils/DialogUtil.dart';
import 'package:provider/provider.dart';
import 'package:together_trek/views/EditPostView.dart';

class PostsView extends StatefulWidget {
  _PostsViewState createState() => _PostsViewState();
}

class _PostsViewState extends State<PostsView> {
  LoadedPostsModel posts;

  void _savePosts(List<PostModel> posts) {
    this.posts.resetPosts(posts);
    return;
  }

  @override
  Widget build(BuildContext context) {
    posts = context.watch<LoadedPostsModel>();
    return RefreshIndicator(
      child: ListView.builder(
          itemCount: posts.posts.length,
          itemBuilder: (BuildContext context, int index) {
            return Card(
                elevation: 2,
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    InkWell(
                        enableFeedback: true,
                        splashColor: Colors.deepOrangeAccent,
                        onTap: () {
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) =>
                                      EditPostView(post: posts.posts[index])));
                        },
                        child: ListTile(title: Text(posts.posts[index].title))),
                  ],
                ));
          }),
      onRefresh: () async {
        List<PostModel> retrievedPosts =
            await getPosts().timeout(Duration(seconds: 10), onTimeout: () {
          showDialog(
              context: context,
              builder: (context) {
                return buildStandardDialog(context, "Network Error",
                    "There was an error retrieving posts from the server.");
              });
          return this.posts.posts;
        }).catchError((err) {
          showDialog(
              context: context,
              builder: (context) {
                return buildStandardDialog(
                    context, "Network Error", err.toString());
              });
          return this.posts.posts;
        });
        setState(() {
          _savePosts(retrievedPosts);
        });
      },
    );
  }
}
