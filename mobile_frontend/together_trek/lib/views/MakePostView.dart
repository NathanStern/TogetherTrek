import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:package_info/package_info.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:together_trek/api/PostWrapper.dart';
import 'package:together_trek/views/HomeView.dart';

class MakePostView extends StatefulWidget {
  _MakePostViewState createState() => _MakePostViewState();
}

class _MakePostViewState extends State<MakePostView> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("New Post"),
      ),
      body: MyCustomForm(),
    );
  }
}

class MyCustomForm extends StatefulWidget {
  @override
  MyCustomFormState createState() {
    return MyCustomFormState();
  }
}

class MyCustomFormState extends State<MyCustomForm> {
  // Create a global key that uniquely identifies the Form widget
  // and allows validation of the form.
  //
  // Note: This is a GlobalKey<FormState>,
  // not a GlobalKey<MyCustomFormState>.
  final _formKey = GlobalKey<FormState>();

  String _title = '';
  String _description = '';
  String _country = '';
  String _city = '';
  String _region = '';

  @override
  Widget build(BuildContext context) {
    // Build a Form widget using the _formKey created above.
    return Form(
      key: _formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          TextFormField(
            decoration: InputDecoration(hintText: "Title"),
            validator: (value) {
              if (value.isEmpty) {
                return 'Please enter a title';
              }
              return null;
            },
            onSaved: (value) {
              setState(() {
                _title = value;
              });
            },
          ),
          TextFormField(
            decoration: InputDecoration(hintText: "Description"),
            validator: (value) {
              if (value.isEmpty) {
                return 'Please enter a description';
              }
              return null;
            },
            onSaved: (val) => setState(() => _description = val),
          ),
          TextFormField(
            decoration: InputDecoration(hintText: "Country"),
            validator: (value) {
              if (value.isEmpty) {
                return 'Please enter a country';
              }
              return null;
            },
            onSaved: (val) => setState(() => _country = val),
          ),
          TextFormField(
            decoration: InputDecoration(hintText: "City"),
            validator: (value) {
              if (value.isEmpty) {
                return 'Please enter a city';
              }
              return null;
            },
            onSaved: (val) => setState(() => _city = val),
          ),
          TextFormField(
            decoration: InputDecoration(hintText: "State/Region"),
            validator: (value) {
              if (value.isEmpty) {
                return 'Please enter a region';
              }
              return null;
            },
            onSaved: (val) => setState(() => _region = val),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 16.0),
            child: ElevatedButton(
              onPressed: () {
                // Validate returns true if the form is valid, or false
                // otherwise.
                if (_formKey.currentState.validate()) {
                  final form = _formKey.currentState;
                  form.save();
                  // If the form is valid, display a Snackbar.
                  makePost(
                      context, _title, _description, _country, _city, _region);
                  Navigator.pop(context);
                }
              },
              child: Text('Submit'),
            ),
          ),
        ],
      ),
    );
  }
}
