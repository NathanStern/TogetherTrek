import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:package_info/package_info.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:together_trek/api/PostWrapper.dart';
import 'package:together_trek/api/UserWrapper.dart';
import 'package:together_trek/models/LoadedPostsModel.dart';
import 'package:together_trek/models/PostModel.dart';
import 'package:together_trek/utils/DialogUtil.dart';
import 'package:together_trek/models/UserModel.dart';
//import 'package:together_trek/views/AlertView.dart';
import 'package:together_trek/views/HomeView.dart';
import 'package:together_trek/views/EditPostView.dart';
import 'package:together_trek/views/TempProfileView.dart';
import 'package:provider/provider.dart';
import 'package:flutter_speed_dial/flutter_speed_dial.dart';

class PostView extends StatefulWidget {
  PostView({Key key, this.post}) : super(key: key);

  PostModel post;

  _PostViewState createState() => _PostViewState(post: post);
}

class _PostViewState extends State<PostView> {
  _PostViewState({this.post});
  PostModel post;
  UserModel viewer;

  @override
  Widget build(BuildContext context) {
    UserModel user = context.read<UserModel>();
    return Scaffold(
      appBar: AppBar(
        title: Text("Post"),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Text(
            "Title:",
            style: TextStyle(
                color: Colors.redAccent,
                fontStyle: FontStyle.normal,
                fontSize: 28.0),
          ),
          SizedBox(
            height: 10.0,
          ),
          Text(
            post.title,
            style: TextStyle(
              fontSize: 22.0,
              fontStyle: FontStyle.italic,
              fontWeight: FontWeight.w300,
              color: Colors.black,
              letterSpacing: 2.0,
            ),
          ),
          Text(
            "Description:",
            style: TextStyle(
                color: Colors.redAccent,
                fontStyle: FontStyle.normal,
                fontSize: 28.0),
          ),
          SizedBox(
            height: 10.0,
          ),
          Text(
            post.description,
            style: TextStyle(
              fontSize: 22.0,
              fontStyle: FontStyle.italic,
              fontWeight: FontWeight.w300,
              color: Colors.black,
              letterSpacing: 2.0,
            ),
          ),
          Text(
            "Destination:",
            style: TextStyle(
                color: Colors.redAccent,
                fontStyle: FontStyle.normal,
                fontSize: 28.0),
          ),
          SizedBox(
            height: 10.0,
          ),
          Text(
            post.destinations[0].toString(),
            style: TextStyle(
              fontSize: 22.0,
              fontStyle: FontStyle.italic,
              fontWeight: FontWeight.w300,
              color: Colors.black,
              letterSpacing: 2.0,
            ),
          ),
          Padding(
              padding: const EdgeInsets.all(8.0),
              child: ElevatedButton(
                onPressed: () async {
                  viewer = await getUser(post.authorId);
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => TempProfileView(user: viewer)),
                  );
                },
                child: Text('View Author'),
              )),
          (post.authorId == user.id)
              ? Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: ElevatedButton(
                    onPressed: () async {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => EditPostView(post: post)),
                      );
                    },
                    child: Text('Edit Post'),
                  ))
              : Container(),
        ],
      ),
    );
  }
}
// class MyCustomForm extends StatefulWidget {
//   MyCustomForm({Key key, this.post}) : super(key: key);
//   PostModel post;
//   @override
//   MyCustomFormState createState() {
//     return MyCustomFormState(post: post);
//   }
// }
