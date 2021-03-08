import 'package:flutter/material.dart';

class PostsView extends StatefulWidget {
  _PostsViewState createState() => _PostsViewState();
}

class _PostsViewState extends State<PostsView> {
  @override
  Widget build(BuildContext context) {
    return Container(
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
      Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [Text("Home")],
      )
    ]));
  }
}
