import 'dart:math';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:together_trek/models/UserModel.dart';
import 'package:together_trek/views/ProfileInfoView.dart';
import 'package:together_trek/views/ProfilePage.dart';
import 'ProfileInfoView.dart';

class EditProfilePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              "Update your profile",
              style: TextStyle(
                  color: Colors.redAccent,
                  fontStyle: FontStyle.normal,
                  fontSize: 28.0),
            ),
            
            TextFormField(
              decoration: const InputDecoration(
                hintText: 'Enter your First Name',
              ),
            ),
            RaisedButton(
              textColor: Colors.white,
              color: Colors.redAccent,
              child: Text('Confirm'),
              onPressed: () {
                Navigator.pop(context);
              },
            ),
            TextFormField(
              decoration: const InputDecoration(
                hintText: 'Enter your Last Name',
              ),
            ),
            RaisedButton(
              textColor: Colors.white,
              color: Colors.redAccent,
              child: Text('Confirm'),
              onPressed: () {
                Navigator.pop(context);
              },
            ),
            TextFormField(
              decoration: const InputDecoration(
                hintText: 'Enter your Destination',
              ),
            ),
            RaisedButton(
              textColor: Colors.white,
              color: Colors.redAccent,
              child: Text('Confirm'),
              onPressed: () {
                Navigator.pop(context);
              },
            ),
            TextFormField(
              decoration: const InputDecoration(
                hintText: 'Enter your Budget',
              ),
            ),
            RaisedButton(
              textColor: Colors.white,
              color: Colors.redAccent,
              child: Text('Confirm'),
              onPressed: () {
                Navigator.pop(context);
              },
            ),
            TextFormField(
              decoration: const InputDecoration(
                hintText: 'Enter your Birthdate',
              ),
            ),
            RaisedButton(
              textColor: Colors.white,
              color: Colors.redAccent,
              child: Text('Confirm'),
              onPressed: () {
                Navigator.pop(context);
              },
            ),
            TextFormField(
              decoration: const InputDecoration(
                hintText: 'Enter your Bio',
              ),
            ),
            RaisedButton(
              textColor: Colors.white,
              color: Colors.redAccent,
              child: Text('Confirm'),
              onPressed: () {
                Navigator.pop(context);
              },
            ),
            SizedBox(
              height: 10.0,
            ),
            RaisedButton(
              textColor: Colors.white,
              color: Colors.redAccent,
              child: Text('Return to Profile Page'),
              onPressed: () {
                Navigator.pop(context);
              },
            )
          ],
        ),
      ),
    );
  }
}