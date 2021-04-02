import 'dart:convert';
import 'package:http/http.dart' as http;

import 'package:flutter/material.dart';
import 'package:package_info/package_info.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:together_trek/api/TripWrapper.dart';
import 'package:together_trek/utils/DialogUtil.dart';
import 'package:together_trek/views/HomeView.dart';

class MakeTripView extends StatefulWidget {
  _MakeTripViewState createState() => _MakeTripViewState();
}

class _MakeTripViewState extends State<MakeTripView> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("New Trip"),
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

  final _startController = TextEditingController();
  final _endController = TextEditingController();
  DateTime _start_date;
  DateTime _end_date;
  String end_date = '';
  String _country = '';
  String _city = '';
  String _region = '';

  Future<void> _submit() async {
    http.Response response = await makeTrip(context, _start_date.toString(), _end_date.toString(), _country, _city, _region);
    if (response.statusCode != 200) {
          //_firstPressed = true;
          print(response.body);
          showDialog(
              context: context,
              builder: (context) => buildStandardDialog(
                  context,
                  "Registration Error",
                  response.body));
        }
        else {Navigator.pop(context);}

  }

  @override
  Widget build(BuildContext context) {
    // Build a Form widget using the _formKey created above.
    return Form(
      key: _formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          
             TextFormField(
                                decoration: InputDecoration(
                                    hintText: "Start date",
                                    icon: Icon(Icons.calendar_today_outlined)),
                                controller: _startController,
                                onTap: () async {
                                  DateTime picker = await showDatePicker(
                                      context: context,
                                      initialDate: DateTime.now(),
                                      firstDate: DateTime(1900),
                                      lastDate: DateTime(2030),
                                      helpText: "Start Date");

                                  //start_date = picker.toString();
                                  if (picker != null) {
                                    this._start_date = picker;
                                  }
                                  setState(() {
                                    if (this._start_date != null) {
                                      _startController.text =
                                          "${this._start_date.month}/${this._start_date.day}/${this._start_date.year}";
                                      FocusScopeNode currentNode =
                                          FocusScope.of(context);

                                      if (!currentNode.hasPrimaryFocus) {
                                        currentNode.unfocus();
                                      }
                                      // _fieldFocusChange(context,
                                      //     _startFocus);
                                    } else {
                                      _startController.text = "";
                                    }
                                  });
                                },
                                readOnly: true,
                                textInputAction: TextInputAction.next,
                                onFieldSubmitted: (val) {},
                                validator: (value) {
                                  if (value.isEmpty) {
                                    return "Please enter your date to start";
                                  } else {
                                    return null;
                                  }
                                },
                              ),
                              TextFormField(
                                decoration: InputDecoration(
                                    hintText: "End date",
                                    icon: Icon(Icons.calendar_today_outlined)),
                                controller: _endController,
                                onTap: () async {
                                  DateTime picker = await showDatePicker(
                                      context: context,
                                      initialDate: DateTime.now(),
                                      firstDate: DateTime(1900),
                                      lastDate: DateTime(2030),
                                      helpText: "Start Date");

                                  //start_date = picker.toString();
                                  if (picker != null) {
                                    this._end_date = picker;
                                  }
                                  setState(() {
                                    if (this._start_date != null) {
                                      _endController.text =
                                          "${this._end_date.month}/${this._end_date.day}/${this._end_date.year}";
                                      FocusScopeNode currentNode =
                                          FocusScope.of(context);

                                      if (!currentNode.hasPrimaryFocus) {
                                        currentNode.unfocus();
                                      }
                                      // _fieldFocusChange(context,
                                      //     _startFocus);
                                    } else {
                                      _startController.text = "";
                                    }
                                  });
                                },
                                readOnly: true,
                                textInputAction: TextInputAction.next,
                                onFieldSubmitted: (val) {},
                                validator: (value) {
                                  if (value.isEmpty) {
                                    return "Please enter your date to end";
                                  } else {
                                    return null;
                                  }
                                },
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
                  _submit();
                
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
