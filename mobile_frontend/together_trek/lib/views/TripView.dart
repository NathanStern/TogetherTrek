import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'package:together_trek/api/TripWrapper.dart';
import 'package:together_trek/api/ExpenseWrapper.dart';
import 'package:together_trek/api/httpRequest.dart';
import 'package:together_trek/models/LoadedTripsModel.dart';
import 'package:together_trek/models/LoadedExpensesModel.dart';
import 'package:together_trek/models/TripModel.dart';
import 'package:together_trek/models/UserModel.dart';
import 'package:together_trek/models/ExpenseModel.dart';
import 'package:together_trek/models/ExpenseBodyModel.dart';
import 'package:together_trek/utils/DialogUtil.dart';
import 'package:together_trek/views/AddExpenseView.dart';
//import 'package:together_trek/views/AlertView.dart';
import 'package:together_trek/views/HomeView.dart';
import 'package:together_trek/views/TempProfileView.dart';
import 'package:together_trek/views/TripPhotosView.dart';

class TripView extends StatefulWidget {
  TripView({Key key, this.trip}) : super(key: key);

  TripModel trip;

  _TripViewState createState() => _TripViewState(trip: trip);
}

class _TripViewState extends State<TripView> {
  _TripViewState({this.trip});
  TripModel trip;
  UserModel user;
  List data;
  //LoadedExpensesModel expensesList;

  // Future<List<ExpenseModel>> expensesL = getExpenses();

  //   void _saveExpenses(List<ExpenseModel> expenses) {
  //   this.expensesList.resetExpenses(expenses);
  //   return;
  // }

  @override
  Widget build(BuildContext context) {
    user = context.read<UserModel>();
    Future<List<ExpenseModel>> expenses = getExpenses();
    Future<List<ExpenseModel>> foodExpenses = getFoodExpenses(trip.id);
    Future<List<ExpenseModel>> housingExpenses = getHousingExpenses(trip.id);
    Future<List<ExpenseModel>> transpExpenses = getTranspExpenses(trip.id);
    Future<List<ExpenseModel>> otherExpenses = getOtherExpenses(trip.id);

    if (trip.participantIds.contains(user.id)) {
      return Scaffold(
        appBar: AppBar(
          title: Text("Trip"),
        ),
        body: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text(
              "Start Date:",
              style: TextStyle(
                  color: Colors.redAccent,
                  fontStyle: FontStyle.normal,
                  fontSize: 28.0),
            ),
            SizedBox(
              height: 10.0,
            ),
            Text(
              trip.startDate.substring(0, 10),
              style: TextStyle(
                fontSize: 22.0,
                fontStyle: FontStyle.italic,
                fontWeight: FontWeight.w300,
                color: Colors.black,
                letterSpacing: 2.0,
              ),
            ),
            Text(
              "End Date:",
              style: TextStyle(
                  color: Colors.redAccent,
                  fontStyle: FontStyle.normal,
                  fontSize: 28.0),
            ),
            SizedBox(
              height: 10.0,
            ),
            Text(
              trip.endDate.substring(0, 10),
              style: TextStyle(
                fontSize: 22.0,
                fontStyle: FontStyle.italic,
                fontWeight: FontWeight.w300,
                color: Colors.black,
                letterSpacing: 2.0,
              ),
            ),
            Text(
              "Destination:",
              style: TextStyle(
                  color: Colors.redAccent,
                  fontStyle: FontStyle.normal,
                  fontSize: 28.0),
            ),
            SizedBox(
              height: 10.0,
            ),
            Text(
              trip.destination.toString(),
              style: TextStyle(
                fontSize: 22.0,
                fontStyle: FontStyle.italic,
                fontWeight: FontWeight.w300,
                color: Colors.black,
                letterSpacing: 2.0,
              ),
            ),

            // Flexible(
            //     child: FutureBuilder(
            //         future: expenses,
            //         builder: (context, snapshot) {
            //           if (!snapshot.hasData) {
            //             return Center(child: CircularProgressIndicator());
            //           } else {
            //             return Container(
            //                 child: ListView.builder(
            //                     itemCount: snapshot.data.length,
            //                     scrollDirection: Axis.vertical,
            //                     itemBuilder: (BuildContext context, int index) {
            //                       return Text('${snapshot.data[index].category}');
            //                     }));
            //           }
            //         })),

                    Text("food"),
            Flexible(
                child: FutureBuilder(
                    future: foodExpenses,
                    builder: (context, snapshot) {
                      if (!snapshot.hasData) {
                        return Center(child: CircularProgressIndicator());
                      } else {
                        return Container(
                            child: ListView.builder(
                                itemCount: snapshot.data.length,
                                scrollDirection: Axis.vertical,
                                itemBuilder: (BuildContext context, int index) {
                                  return Text('${snapshot.data[index].toString()}');
                                }));
                      }
                    })),
                    Text("housing"),
            Flexible(
                child: FutureBuilder(
                    future: housingExpenses,
                    builder: (context, snapshot) {
                      if (!snapshot.hasData) {
                        return Center(child: CircularProgressIndicator());
                      } else {
                        return Container(
                            child: ListView.builder(
                                itemCount: snapshot.data.length,
                                scrollDirection: Axis.vertical,
                                itemBuilder: (BuildContext context, int index) {
                                  return Text('${snapshot.data[index].toString()}');
                                }));
                      }
                    })),
                    Text("transportation"),
            Flexible(
                child: FutureBuilder(
                    future: transpExpenses,
                    builder: (context, snapshot) {
                      if (!snapshot.hasData) {
                        return Center(child: CircularProgressIndicator());
                      } else {
                        return Container(
                            child: ListView.builder(
                                itemCount: snapshot.data.length,
                                scrollDirection: Axis.vertical,
                                itemBuilder: (BuildContext context, int index) {
                                  return Text('${snapshot.data[index].toString()}');
                                }));
                      }
                    })),
                    Text("other"),
            Flexible(
                child: FutureBuilder(
                    future: otherExpenses,
                    builder: (context, snapshot) {
                      if (!snapshot.hasData) {
                        return Center(child: CircularProgressIndicator());
                      } else {
                        return Container(
                            child: ListView.builder(
                                itemCount: snapshot.data.length,
                                scrollDirection: Axis.vertical,
                                itemBuilder: (BuildContext context, int index) {
                                  return Text('${snapshot.data[index].toString()}');
                                }));
                      }
                    })),
            Padding(
                padding: const EdgeInsets.all(8.0),
                child: ElevatedButton(
                  onPressed: () async {
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => TripPhotosView(trip)));
                  },
                  child: Text('View Photos'),
                )),
                Padding(
                padding: const EdgeInsets.all(8.0),
                child: ElevatedButton(
                  onPressed: () async {
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => AddExpenseView(trip.id)));
                  },
                  child: Text('Add Expense'),
                ))
          ],
        ),
      );
    } else {
      return Scaffold(
        appBar: AppBar(
          title: Text("Trip"),
        ),
        body: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text(
              "Start Date:",
              style: TextStyle(
                  color: Colors.redAccent,
                  fontStyle: FontStyle.normal,
                  fontSize: 28.0),
            ),
            SizedBox(
              height: 10.0,
            ),
            Text(
              trip.startDate.substring(0, 10),
              style: TextStyle(
                fontSize: 22.0,
                fontStyle: FontStyle.italic,
                fontWeight: FontWeight.w300,
                color: Colors.black,
                letterSpacing: 2.0,
              ),
            ),
            Text(
              "End Date:",
              style: TextStyle(
                  color: Colors.redAccent,
                  fontStyle: FontStyle.normal,
                  fontSize: 28.0),
            ),
            SizedBox(
              height: 10.0,
            ),
            Text(
              trip.endDate.substring(0, 10),
              style: TextStyle(
                fontSize: 22.0,
                fontStyle: FontStyle.italic,
                fontWeight: FontWeight.w300,
                color: Colors.black,
                letterSpacing: 2.0,
              ),
            ),
            Text(
              "Destination:",
              style: TextStyle(
                  color: Colors.redAccent,
                  fontStyle: FontStyle.normal,
                  fontSize: 28.0),
            ),
            SizedBox(
              height: 10.0,
            ),
            Text(
              trip.destination.toString(),
              style: TextStyle(
                fontSize: 22.0,
                fontStyle: FontStyle.italic,
                fontWeight: FontWeight.w300,
                color: Colors.black,
                letterSpacing: 2.0,
              ),
            ),
            Padding(
                padding: const EdgeInsets.all(8.0),
                child: ElevatedButton(
                  onPressed: () async {
                    requestJoinTrip(context, trip.id);
                  },
                  child: Text('Request to join'),
                ))
          ],
        ),
      );
    }
  }
}
