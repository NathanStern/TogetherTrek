import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:together_trek/models/UserModel.dart';
import 'package:together_trek/views/PostView.dart';

class UserPostView extends StatefulWidget {
  UserPostView({Key key}) : super(key: key);

  _UserPostViewState createState() => _UserPostViewState();
}

class _UserPostViewState extends State<UserPostView> {
  UserModel user;

  @override
  Widget build(BuildContext context) {
    user = context.watch<UserModel>();
    if (user == null) {
      return Scaffold(
        appBar: AppBar(title: Text("My Posts")),
        body: Container(child: Text("Invalid User")),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: Text("My Posts"),
      ),
      body: Container(
          child: ListView.builder(
              itemCount: this.user.postIds.length,
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
                              onTap: () {
                                Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) => PostView(
                                            post: this.user.postIds[index])));
                              },
                              borderRadius: BorderRadius.circular(2.5),
                              enableFeedback: true,
                              splashColor: Colors.deepOrangeAccent,
                              child: ListTile(
                                  title: Text(this
                                          .user
                                          .postIds[index]
                                          .destinations[0]
                                          .country +
                                      ", " +
                                      this
                                          .user
                                          .postIds[index]
                                          .destinations[0]
                                          .city)))
                        ]));
              })),
    );
  }
}
