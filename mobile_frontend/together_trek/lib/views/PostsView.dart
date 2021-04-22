import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'package:together_trek/api/PostWrapper.dart';
import 'package:together_trek/models/LoadedPostsModel.dart';
import 'package:together_trek/models/PostModel.dart';
import 'package:together_trek/models/UserModel.dart';
import 'package:together_trek/utils/DialogUtil.dart';
import 'package:together_trek/views/PostView.dart';

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
    UserModel user = context.read<UserModel>();
    int _toReverse = 1;
    return RefreshIndicator(
      child: ListView.builder(
          physics: BouncingScrollPhysics(),
          itemCount: posts.posts.length,
          itemBuilder: (BuildContext context, int index) {
            return Card(
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(3)),
                elevation: 2,
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    InkWell(
                        borderRadius: BorderRadius.circular(2.5),
                        enableFeedback: true,
                        splashColor: Colors.deepOrangeAccent,
                        onTap: () {
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) =>
                                      PostView(post: posts.posts[index])));
                        },
                        child: ListTile(title: Text(posts.posts[index].title))),
                  ],
                ));
          }),
      onRefresh: () async {
        List<PostModel> retrievedPosts =
            await getPosts().timeout(Duration(seconds: 15), onTimeout: () {
          showDialog(
              context: context,
              builder: (context) {
                return buildStandardDialog(context, "Network Error",
                    "There was an error retrieving posts from the server.");
              });
          _toReverse = 0;
          return this.posts.posts;
        }).catchError((err) {
          showDialog(
              context: context,
              builder: (context) {
                return buildStandardDialog(
                    context, "Network Error", err.toString());
              });
          _toReverse = 0;
          return this.posts.posts;
        });
        setState(() {
          if (_toReverse == 1) {
            _savePosts(retrievedPosts);
          } else {
            _toReverse = 1;
          }
        });
        user.postIds = await getPostsById(posts.posts, user.id);
      },
    );
  }
}
