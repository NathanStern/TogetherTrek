import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:package_info/package_info.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:together_trek/models/UserModel.dart';
import 'package:together_trek/views/PlaceholderView.dart';
import 'package:provider/provider.dart';

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
                        style: TextStyle(color: Colors.grey[100], fontSize: 18))
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
            SharedPreferences prefs = await SharedPreferences.getInstance();
            await prefs.setString('user', jsonEncode(new UserModel.empty()));
            UserModel user = context.read<UserModel>();
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
                        style: TextStyle(color: Colors.grey[100], fontSize: 18))
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
          title: Text("Settings"),
          onTap: () {
            Navigator.pop(context);
            Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => PlaceholderView(title: "Settings")));
          },
        ),
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
