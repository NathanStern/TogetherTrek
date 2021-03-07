import 'package:flutter/material.dart';

class ProfilePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text("TogetherTrek: Profile")),
        body: Container(
            child: Center(
                child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
              Container(
                  padding: EdgeInsets.all(10),
                  child: Icon(Icons.person_rounded,
                      size: MediaQuery.of(context).size.width / 2)),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Column(
                    children: [
                      Container(
                          padding: EdgeInsets.all(10), child: Text("Hello")),
                      Container(padding: EdgeInsets.all(10), child: Text("Obi"))
                    ],
                  ),
                  Column(children: [
                    Container(
                        padding: EdgeInsets.all(10), child: Text("There")),
                    Container(padding: EdgeInsets.all(10), child: Text("Wan")),
                  ])
                ],
              )
            ]))));
  }
}
