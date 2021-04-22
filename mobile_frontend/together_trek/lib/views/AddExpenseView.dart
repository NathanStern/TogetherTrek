import 'dart:convert';
import 'package:http/http.dart' as http;

import 'package:flutter/material.dart';
import 'package:package_info/package_info.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:together_trek/api/ExpenseWrapper.dart';
import 'package:together_trek/utils/DialogUtil.dart';
import 'package:together_trek/views/HomeView.dart';

class AddExpenseView extends StatefulWidget {
  String trip_id;
  AddExpenseView(String id) {
    this.trip_id = id;
  }
  _AddExpenseViewState createState() => _AddExpenseViewState(trip_id);
}

class _AddExpenseViewState extends State<AddExpenseView> {
  String trip_id;
  _AddExpenseViewState(String id) {
    this.trip_id = id;
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("New Expense"),
      ),
      body: MyCustomForm(trip_id),
    );
  }
}

class MyCustomForm extends StatefulWidget {
  String trip_id;
  MyCustomForm(String id) {
    this.trip_id = id;
  }
  @override
  MyCustomFormState createState() {
    return MyCustomFormState(trip_id);
  }
}

class MyCustomFormState extends State<MyCustomForm> {
   String trip_id;
  MyCustomFormState(String id) {
    this.trip_id = id;
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
    http.Response response = await makeExpense(context, amount, _description, _date.toString(), _category, trip_id);
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
                Navigator.pop(context);
              },
              child: Text('Submit'),
            ),
          ),
        ],
      ),
    );
  }
}
