import 'dart:convert';
import 'package:http/http.dart' as http;

import 'package:flutter/material.dart';
import 'package:package_info/package_info.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:together_trek/api/ExpenseWrapper.dart';
import 'package:together_trek/api/TripWrapper.dart';
import 'package:together_trek/models/TripModel.dart';
import 'package:together_trek/utils/DialogUtil.dart';
import 'package:together_trek/views/HomeView.dart';

class AddExpenseView extends StatefulWidget {
  TripModel trip;
  AddExpenseView(TripModel id) {
    this.trip = id;
  }
  _AddExpenseViewState createState() => _AddExpenseViewState(trip);
}

class _AddExpenseViewState extends State<AddExpenseView> {
  TripModel trip;
  _AddExpenseViewState(TripModel id) {
    this.trip = id;
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("New Expense"),
      ),
      body: MyCustomForm(trip),
    );
  }
}

class MyCustomForm extends StatefulWidget {
  TripModel trip;
  MyCustomForm(TripModel id) {
    this.trip = id;
  }
  @override
  MyCustomFormState createState() {
    return MyCustomFormState(trip);
  }
}

class MyCustomFormState extends State<MyCustomForm> {
   //String trip_id;
   TripModel trip;
  MyCustomFormState(TripModel id) {
    this.trip = id;
  }
  // Create a global key that uniquely identifies the Form widget
  // and allows validation of the form.
  //
  // Note: This is a GlobalKey<FormState>,
  // not a GlobalKey<MyCustomFormState>.
  final _formKey = GlobalKey<FormState>();
  final _dateController = TextEditingController();
  DateTime _date;
  String _description = '';
  num amount = 0;
  String _category = '';

  Future<void> _submit() async {

    http.Response response = await makeExpense(context, amount, _description, _date.toString(), _category, trip.id);
    num totalExpense = (trip.total_expenses+amount);
    num expensePP = (trip.total_expenses+amount)/trip.participantIds.length;
    http.Response tripResponse = await updateTrip(context, trip.id, trip.startDate, trip.endDate, trip.destination.city, trip.destination.country, trip.destination.region, 
    totalExpense, expensePP, trip.budget, trip );
    Navigator.pop(context);

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
                                    hintText: "Enter date",
                                    icon: Icon(Icons.calendar_today_outlined)),
                                controller: _dateController,
                                onTap: () async {
                                  DateTime picker = await showDatePicker(
                                      context: context,
                                      initialDate: DateTime.now(),
                                      firstDate: DateTime(1900),
                                      lastDate: DateTime(2030),
                                      helpText: "Date");

                                  //start_date = picker.toString();
                                  if (picker != null) {
                                    this._date = picker;
                                  }
                                  setState(() {
                                    if (this._date != null) {
                                      _dateController.text =
                                          "${this._date.month}/${this._date.day}/${this._date.year}";
                                      FocusScopeNode currentNode =
                                          FocusScope.of(context);

                                      if (!currentNode.hasPrimaryFocus) {
                                        currentNode.unfocus();
                                      }
                                      // _fieldFocusChange(context,
                                      //     _startFocus);
                                    } else {
                                      _dateController.text = "";
                                    }
                                  });
                                },
                                readOnly: true,
                                textInputAction: TextInputAction.next,
                                onFieldSubmitted: (val) {},
                                validator: (value) {
                                  if (value.isEmpty) {
                                    return "Please enter your date";
                                  } else {
                                    return null;
                                  }
                                },
                              ),
                              
          TextFormField(
            decoration: InputDecoration(hintText: "amount"),
            keyboardType: TextInputType.number,
            validator: (num) {
              if (num.isEmpty) {
                return 'Please enter an amount';
              }
              return null;
            },
            onSaved: (num) => setState(() => amount = double.parse(num)),
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
            decoration: InputDecoration(hintText: "Category"),
            validator: (value) {
              if ((value != "Food") && (value != "Housing") && (value != "Transportation") && (value != "Other")) {
                return 'Please enter a category';
              }
              return null;
            },
            onSaved: (val) => setState(() => _category = val),
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
                //Navigator.pop(context);
              },
              child: Text('Submit'),
            ),
          ),
        ],
      ),
    );
  }
}
