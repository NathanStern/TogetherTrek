import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:together_trek/api/UserWrapper.dart';

import 'package:together_trek/models/UserModel.dart';
import 'package:together_trek/views/BlockedListView.dart';

class BlockedPageView extends StatefulWidget {
  BlockedPageView({Key key}) : super(key: key);

  _BlockedPageViewState createState() => _BlockedPageViewState();
}

class _BlockedPageViewState extends State<BlockedPageView> {
  UserModel user;
  UserModel current;

  @override
  Widget build(BuildContext context) {
    user = context.watch<UserModel>();
    if (user == null) {
      return Scaffold(
        appBar: AppBar(title: Text("Blocked Users")),
        body: Container(child: Text("Invalid User")),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: Text("Blocked Users"),
      ),
      body: Container(
          child: ListView.builder(
              itemCount: this.user.blockedIds.length,
              itemBuilder: (BuildContext context, int index) {
                return InkWell(
                    onTap: () async {
                      current = await getUser(user.blockedIds[index]);
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) =>
                                  BlockedListView(user: current)));
                    },
                    child: Card(
                        elevation: 5,
                        child: Text(this.user.blockedIds[index])));
              })),
    );
  }
}
