import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:together_trek/api/UserWrapper.dart';

import 'package:together_trek/utils/DialogUtil.dart';
import 'package:together_trek/views/NotificationView.dart';
import 'package:together_trek/models/UserModel.dart';

class NotificationPageView extends StatefulWidget {
  _NotificationPageViewState createState() => _NotificationPageViewState();
}

class _NotificationPageViewState extends State<NotificationPageView> {
  UserModel user;
  UserModel current;

  @override
  Widget build(BuildContext context) {
    user = context.read<UserModel>();
    int _toReverse = 1;
    return RefreshIndicator(
        child: ListView.builder(
            physics: BouncingScrollPhysics(),
            itemCount: user.friendRequests.length,
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
                          onTap: () async {
                            current = await getUser(user.friendRequests[index]);
                            Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) => NotificationView(
                                        user: current)));
                          },
                          child: ListTile(
                              title: Text(user.friendRequests[index]))),
                    ],
                  ));
            }),
        onRefresh: () async {});
  }
}
