import 'package:flutter/material.dart';
import 'package:together_trek/api/PostWrapper.dart';
import 'package:together_trek/models/LoadedPostsModel.dart';
import 'package:provider/provider.dart';

class LaunchView extends StatelessWidget {
  void _loadPosts(BuildContext context, LoadedPostsModel posts) async {
    posts.resetPosts(List.from((await getPosts()).reversed));
  }

  @override
  Widget build(BuildContext context) {
    // LoadedPostsModel posts = context.read<LoadedPostsModel>();
    Future.delayed(Duration(seconds: 2), () async {
      // await _loadPosts(context, posts);
      Navigator.pushNamedAndRemoveUntil(context, '/', (route) => false);
    });
    return Scaffold(
        backgroundColor: Colors.white,
        body: Container(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Row(
                mainAxisSize: MainAxisSize.max,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Image(
                      image: ResizeImage(AssetImage('lib/resources/logo.jpg'),
                          allowUpscaling: true,
                          height: (MediaQuery.of(context).size.height ~/ 2)),
                      width: (MediaQuery.of(context).size.width / 1)),
                ],
              ),
            ],
          ),
        ));
  }
}
