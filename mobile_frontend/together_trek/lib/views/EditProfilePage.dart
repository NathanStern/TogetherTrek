import 'dart:html';
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
    return Container(
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            RaisedButton(
              textColor: Colors.white,
              color: Colors.redAccent,
              child: Text('Finish Editing'),
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
