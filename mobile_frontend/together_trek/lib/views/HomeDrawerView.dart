import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:package_info/package_info.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:together_trek/api/UserWrapper.dart';
import 'package:together_trek/models/MessageSummaryListModel.dart';
import 'package:together_trek/models/UserModel.dart';
import 'package:together_trek/views/LoginView.dart';
import 'package:together_trek/views/PlaceholderView.dart';
import 'package:provider/provider.dart';
import 'package:together_trek/views/FriendListView.dart';
import 'package:together_trek/views/FriendPageView.dart';
import 'package:together_trek/views/BlockedListView.dart';
import 'package:together_trek/views/UserPostView.dart';
import 'package:together_trek/views/UserTripView.dart';
import 'package:together_trek/views/NearbyUsersView.dart';

Widget createDrawer(BuildContext context, UserModel user,
    Function _onTappedItem, Future<PackageInfo> packageInfo) {
  user = context.watch<UserModel>();
  if (!(user == null || user.id == "")) {
    return Drawer(
        child: ListView(
      padding: EdgeInsets.zero,
      children: [
        DrawerHeader(
            child: Row(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Column(
                  mainAxisSize: MainAxisSize.min,
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Text("TogetherTrek",
                        style: TextStyle(fontSize: 30, color: Colors.white)),
                    Text("Travel Together",
                        style:
                            TextStyle(color: Colors.grey[100], fontSize: 18)),
                    Text(
                      "_id: ${user.id}",
                      style: TextStyle(color: Colors.grey[400]),
                    )
                  ],
                )
              ],
            ),
            decoration: BoxDecoration(color: Colors.deepOrange)),
        ListTile(
          title: Text("Home"),
          onTap: () {
            Navigator.pop(context);
            _onTappedItem(1);
          },
        ),
        ListTile(
          title: Text("Messages"),
          onTap: () {
            Navigator.pop(context);
            _onTappedItem(0);
          },
        ),
        ListTile(
            title: Text("Profile"),
            onTap: () {
              Navigator.pop(context);
              _onTappedItem(2);
            }),
        ListTile(
            title: Text("Friends"),
            onTap: () {
              Navigator.pop(context);
              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => FriendPageView()));
            }),
        ListTile(
          title: Text("My Trips"),
          onTap: () {
            Navigator.pop(context);
            Navigator.push(context,
                MaterialPageRoute(builder: (context) => UserTripView()));
          },
        ),
        ListTile(
          title: Text("My Posts"),
          onTap: () {
            Navigator.pop(context);
            Navigator.push(context,
                MaterialPageRoute(builder: (context) => UserPostView()));
          },
        ),
        ListTile(
            title: Text("Blocked Users"),
            onTap: () {
              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => BlockedListView()));
            }),
        ListTile(
          title: Text("Nearby Users"),
          onTap: () {
            Navigator.pop(context);
            Navigator.push(context,
              MaterialPageRoute(builder: (context) => NearbyUsersView()));
          }
        ),
        ListTile(
          title: Text("Settings"),
          onTap: () {
            Navigator.pop(context);
            Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => PlaceholderView(title: "Settings")));
          },
        ),
        ListTile(
          title: Text("Log Out"),
          tileColor: Colors.redAccent,
          onTap: () async {
            Navigator.pop(context);
            UserModel user = context.read<UserModel>();
            SharedPreferences prefs = await SharedPreferences.getInstance();
            prefs.setString('user', "");
            prefs.setString('jwt', "");
            MessageSummaryListModel loadedPosts =
                context.read<MessageSummaryListModel>();
            loadedPosts.messageBoards = [];
            user.setAllFieldsFromUser(UserModel.empty());
          },
        ),
        ListTile(),
        ListTile(),
        Divider(),
        FutureBuilder<PackageInfo>(
            future: packageInfo,
            builder:
                (BuildContext context, AsyncSnapshot<PackageInfo> snapshot) {
              if (snapshot.hasData) {
                return ListTile(
                    title: Text(
                        "Build: ${snapshot.data.version} (${snapshot.data.buildNumber})"));
              } else {
                return ListTile(title: Text("No build info"));
              }
            })
      ],
    ));
  } else {
    return Drawer(
        child: ListView(
      padding: EdgeInsets.zero,
      children: [
        DrawerHeader(
            child: Row(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Column(
                  mainAxisSize: MainAxisSize.min,
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Text("TogetherTrek",
                        style: TextStyle(fontSize: 30, color: Colors.white)),
                    Text("Travel Together",
                        style:
                            TextStyle(color: Colors.grey[100], fontSize: 18)),
                  ],
                )
              ],
            ),
            decoration: BoxDecoration(color: Colors.deepOrange)),
        ListTile(
          title: Text("Home"),
          onTap: () {
            Navigator.pop(context);
            _onTappedItem(1);
          },
        ),
        ListTile(
          title: Text("Messages"),
          onTap: () {
            Navigator.pop(context);
            _onTappedItem(0);
          },
        ),
        ListTile(
            title: Text("Profile"),
            onTap: () {
              Navigator.pop(context);
              _onTappedItem(2);
            }),
        ListTile(
          title: Text("My Trips"),
          onTap: () {
            Navigator.pop(context);
            Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => PlaceholderView(title: "My Trips")));
          },
        ),
        ListTile(
          title: Text("My Posts"),
          onTap: () {
            Navigator.pop(context);
            Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => PlaceholderView(title: "My Posts")));
          },
        ),
        ListTile(
          title: Text("Nearby Users"),
          onTap: () {
            Navigator.pop(context);
            Navigator.push(context,
              MaterialPageRoute(builder: (context) => NearbyUsersView()));
          }
        ),
        ListTile(
          title: Text("Settings"),
          onTap: () {
            Navigator.pop(context);
            Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => PlaceholderView(title: "Settings")));
          },
        ),
        ListTile(
          title: Text("Log in"),
          onTap: () {
            Navigator.pop(context);
            Navigator.push(context,
                MaterialPageRoute(builder: (context) => LoginView(user: user)));
          },
        ),
        ListTile(),
        ListTile(),
        ListTile(),
        ListTile(),
        Divider(),
        FutureBuilder<PackageInfo>(
            future: packageInfo,
            builder:
                (BuildContext context, AsyncSnapshot<PackageInfo> snapshot) {
              if (snapshot.hasData) {
                return ListTile(
                    title: Text(
                        "Build: ${snapshot.data.version} (${snapshot.data.buildNumber})"));
              } else {
                return ListTile(title: Text("No build info"));
              }
            })
      ],
    ));
  }
}
