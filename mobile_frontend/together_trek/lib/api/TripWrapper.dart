import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';
import 'package:flutter/material.dart';

import "package:together_trek/api/httpRequest.dart";
import 'package:together_trek/models/TripModel.dart';
import 'package:together_trek/models/UserModel.dart';

Future<List<TripModel>> getTrips() async {
  http.Response response = await httpGet('trips');

  List<TripModel> trips = [];

  List<dynamic> json = jsonDecode(response.body);

  for (int i = 0; i < json.length; i++) {
    trips.add(TripModel.fromJson(json[i]));
  }

  return trips;
}

Future<http.Response> makeTrip(BuildContext context, String startDate,
    String endDate, String city, String country, String region) async {
  UserModel user = context.read<UserModel>();
  String data = jsonEncode(<String, dynamic>{
    "creator_id": "${user.id}",
    "start_date": startDate,
    "end_date": endDate,
    "destination": {
      "city": city,
      "country": country,
      "region": region,
    },
    "participant_ids": ["${user.id}"]
  });
  http.Response res = await httpPost('trips', data);
  return res;
}

Future<String> updateTrip(
    BuildContext context,
    String id,
    String startDate,
    String endDate,
    String city,
    String country,
    String region,
    TripModel trip) async {
  UserModel user = context.read<UserModel>();
  String data = jsonEncode(<String, dynamic>{
    "creator_id": "${user.id}",
    "start_date": startDate,
    "end_date": endDate,
    "destination": trip.destination
  });
  print(data);
  http.Response res = await httpPut('trips/${id}', data);
  print(res.statusCode);
  print(res.body);
}

Future<String> requestJoinTrip(BuildContext context, String id) async {
  UserModel user = context.read<UserModel>();
  String data =
      jsonEncode(<String, dynamic>{"requesting_user_id": "${user.id}"});
  print(data);
  http.Response res = await httpPut('trips/request-join/${id}', data);
  print(res.statusCode);
  print(res.body);
  return "Completed";
}
