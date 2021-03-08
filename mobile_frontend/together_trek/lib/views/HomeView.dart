import 'package:flutter/material.dart';
import 'package:package_info/package_info.dart';
import 'package:together_trek/views/MessagesView.dart';
import 'package:together_trek/views/PlaceholderView.dart';
import 'package:together_trek/views/PostsView.dart';
import 'package:together_trek/views/ProfilePage.dart';

class HomeView extends StatefulWidget {
  _HomeViewState createState() => _HomeViewState();
}

class _HomeViewState extends State<HomeView> {
  int _selectedIndex = 1;
  int _counter = 0;

  Future<PackageInfo> packageInfo = PackageInfo.fromPlatform();

  static List<Widget> _widgetOptions = <Widget>[
    MessagesView(),
    PostsView(),
    ProfilePage()
  ];

  void _onTappedItem(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  void _increment() {
    setState(() {
      _counter = _counter + 1;
    });
  }

  Widget _actionButton(int index) {
    if (_selectedIndex == 1) {
      return Container(
          height: 60,
          width: 60,
          child: FittedBox(
              child: FloatingActionButton(
                  onPressed: () {
                    print("Create new post");
                    showDialog(
                        context: context, builder: (context) => _buildDialog());
                  },
                  child: Icon(Icons.add))));
    } else if (_selectedIndex == 0) {
      return Container(
          height: 60,
          width: 60,
          child: FittedBox(
              child: FloatingActionButton(
                  onPressed: () {
                    print("Create new message");
                  },
                  child: Icon(Icons.add))));
    } else {
      return null;
    }
  }

  Widget _buildDialog() {
    return AlertDialog(
      title: Text("Test popup"),
      actions: [
        TextButton(
          child: Text("Close"),
          onPressed: () {
            Navigator.pop(context);
          },
        )
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("TogetherTrek"),
        ),
        body: _widgetOptions.elementAt(_selectedIndex),
        bottomNavigationBar: BottomNavigationBar(
          items: [
            BottomNavigationBarItem(
                icon: Icon(Icons.message_outlined), label: "Messages"),
            BottomNavigationBarItem(
                icon: Icon(Icons.home_outlined), label: "Home"),
            BottomNavigationBarItem(
                icon: Icon(Icons.person_outline), label: "Profile")
          ],
          currentIndex: _selectedIndex,
          onTap: _onTappedItem,
        ),
        floatingActionButton: _actionButton(_selectedIndex),
        drawer: Drawer(
            child: ListView(
          padding: EdgeInsets.zero,
          children: [
            DrawerHeader(
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Column(
                      children: [
                        Text("PLACEHOLDER TITLE"),
                        Text("PLACEHOLDER TEXT")
                      ],
                    )
                  ],
                ),
                decoration: BoxDecoration(
                  color: Colors.deepOrange,
                )),
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
                        builder: (context) =>
                            PlaceholderView(title: "My Trips")));
              },
            ),
            ListTile(
              title: Text("My Posts"),
              onTap: () {
                Navigator.pop(context);
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) =>
                            PlaceholderView(title: "My Posts")));
              },
            ),
            ListTile(
              title: Text("Settings"),
              onTap: () {
                Navigator.pop(context);
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) =>
                            PlaceholderView(title: "Settings")));
              },
            ),
            ListTile(),
            ListTile(),
            ListTile(),
            Divider(),
            FutureBuilder<PackageInfo>(
                future: packageInfo,
                builder: (BuildContext context,
                    AsyncSnapshot<PackageInfo> snapshot) {
                  if (snapshot.hasData) {
                    return ListTile(
                        title: Text(
                            "Build: ${snapshot.data.version} (${snapshot.data.buildNumber})"));
                  } else {
                    return ListTile(title: Text("No build info"));
                  }
                })
          ],
        )));
  }
}
