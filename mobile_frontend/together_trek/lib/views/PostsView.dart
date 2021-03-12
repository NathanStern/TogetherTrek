import 'package:flutter/material.dart';
import 'package:together_trek/api/PostWrapper.dart';
import 'package:together_trek/models/PostModel.dart';
import 'package:together_trek/utils/DialogUtil.dart';

class PostsView extends StatefulWidget {
  _PostsViewState createState() => _PostsViewState();
}

class _PostsViewState extends State<PostsView> {
  List<PostModel> posts = [];

  Future<List<PostModel>> _savePosts() async {
    posts = await getPosts();
    return posts;
  }

  Future<List<PostModel>> postsInit = getPosts();

  @override
  Widget build(BuildContext context) {
    print(posts);
    _savePosts();
    if (posts.isNotEmpty) {
      return RefreshIndicator(
        child: ListView.builder(
            itemCount: posts.length,
            itemBuilder: (BuildContext context, int index) {
              return ListTile(
                title: Text(posts[index].title),
                onTap: () {
                  showDialog(
                      context: context,
                      builder: (context) => buildStandardDialog(context,
                          posts[index].title, posts[index].description));
                },
              );
            }),
        onRefresh: () async {
          await _savePosts();
          setState(() {});
        },
      );
    } else {
      return Container(
          child: FutureBuilder(
              future: postsInit,
              builder: (BuildContext context,
                  AsyncSnapshot<List<PostModel>> snapshot) {
                if (snapshot.hasData) {
                  return RefreshIndicator(
                    child: ListView.builder(
                        itemCount: snapshot.data.length,
                        itemBuilder: (BuildContext context, int index) {
                          return ListTile(
                            title: Text(snapshot.data[index].title),
                            onTap: () {
                              showDialog(
                                  context: context,
                                  builder: (context) => buildStandardDialog(
                                      context,
                                      snapshot.data[index].title,
                                      snapshot.data[index].description));
                            },
                          );
                        }),
                    onRefresh: () async {
                      setState(() {});
                    },
                  );
                } else {
                  return Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [CircularProgressIndicator()]),
                      ]);
                }
              }));
    }
  }
}
