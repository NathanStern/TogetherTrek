import 'package:flutter/material.dart';

class PlaceholderView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("TogetherTrek: Unfinished Route"),
        ),
        body: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Row(mainAxisAlignment: MainAxisAlignment.center, children: [
              Text("This page has not been implemented yet",
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold))
            ])
          ],
        ));
  }
}
