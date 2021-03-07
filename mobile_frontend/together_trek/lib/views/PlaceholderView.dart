import 'package:flutter/material.dart';

class PlaceholderView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    var c_width = MediaQuery.of(context).size.width * 0.8;
    return Scaffold(
        appBar: AppBar(
          title: Text("TogetherTrek: Unfinished"),
        ),
        body: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Row(mainAxisAlignment: MainAxisAlignment.center, children: [
              Container(
                  child: Flexible(
                      child: Text("This page has not been implemented yet.",
                          style: TextStyle(
                              fontSize: 18, fontWeight: FontWeight.bold))))
            ])
          ],
        ));
  }
}
