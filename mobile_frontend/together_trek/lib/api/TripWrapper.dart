import 'dart:convert';
import 'dart:io';
import 'package:cached_network_image/cached_network_image.dart';
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

Future<List<TripModel>> getTripsById(
    List<TripModel> allTrips, String id) async {
  // List<TripModel> allTrips = await getTrips();

  List<TripModel> userTrips = [];

  for (int i = 0; i < allTrips.length; i++) {
    if (allTrips[i].participantIds.contains(id)) {
      userTrips.add(allTrips[i]);
    }
  }

  return userTrips;
}

Future<TripModel> getTrip(String id) async {
  print(id);
  http.Response response = await httpGet('trips/$id');

  print(response.body);

  // return TripModel.fromJson(jsonDecode(response.body));
}

Future<http.Response> makeTrip(
    BuildContext context,
    String startDate,
    String endDate,
    String city,
    String country,
    String region,
    int budget) async {
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
    "total_expenses": 0,
    "expense_per_person": 0,
    "budget": budget,
    "participant_ids": ["${user.id}"]
  });
  http.Response res = await httpPost('trips', data);
  return res;
}

Future<http.Response> updateTrip(
    BuildContext context,
    String id,
    String startDate,
    String endDate,
    String city,
    String country,
    String region,
    num total_expenses,
    num expense_per_person,
    int budget,
    TripModel trip) async {
  UserModel user = context.read<UserModel>();
  String data = jsonEncode(<String, dynamic>{
    "creator_id": "${user.id}",
    "start_date": startDate,
    "end_date": endDate,
    "destination": trip.destination,
    "total_expenses": total_expenses,
    "expense_per_person": expense_per_person,
    "budget": budget,
  });

  http.Response res = await httpPut('trips/${id}', data);
  return res;
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

//<<<<<<< requestbutton
Future<String> requestRemoveFromTrip(BuildContext context, String id,
    String userId, String currentUserId) async {
  //UserModel user = context.read<UserModel>();
  String data = jsonEncode(<String, dynamic>{
    "user_id": "${userId}",
    "current_user_id": "${currentUserId}"
  });
  print(data);
  http.Response res = await httpPut('trips/remove-user-no-token/${id}', data);
  print(res.statusCode);
  print(res.body);
  return "Completed";
} //=======

Future<List<CachedNetworkImageProvider>> getTripPhotos(String id) async {
  http.Response response = await httpGet("/trip_photos/trip/$id");

  List<dynamic> body = await jsonDecode(response.body);

  List<CachedNetworkImageProvider> photos = [];

  for (int i = 0; i < body.length; i++) {
    photos.add(getCachedNetworkImage("trip_photos/${body[i]['_id']}"));
  }

  return photos;
}

Future<int> uploadTripPhoto(Map<String, dynamic> body, File file) async {
  int response = await httpPostFileWithBody('/trip_photos/', file, body);
  return response;
//>>>>>>> main
}
