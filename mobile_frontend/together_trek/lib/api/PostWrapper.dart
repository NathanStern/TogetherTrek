import 'dart:convert';

import 'package:flutter/material.dart';
import "package:together_trek/api/httpRequest.dart";
import 'package:together_trek/models/PostModel.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';
import 'package:together_trek/models/UserModel.dart';

Future<List<PostModel>> getPosts() async {
  http.Response response = await httpGet('posts');

  List<PostModel> posts = [];

  List<dynamic> json = jsonDecode(response.body);

  for (int i = 0; i < json.length; i++) {
    posts.add(PostModel.fromJson(json[i]));
  }

  return posts;
}

Future<Null> makePost(BuildContext context,  String title, String description, String city, String country, String region) async {
  UserModel user = context.read<UserModel>();
  String data = jsonEncode(<String, dynamic>{
    "author_id": "${user.id}",
    "title": title,
    "post_date": DateTime.now().toString(),
    "description": description,
    "destinations": [{
                        "city": city,
                        "country": country,
                        "region": region,
                    }]
    
  });
  http.Response res = await httpPost('posts', data);
  print(res.statusCode);
  print(res.body);
}

Future<Null> updatePost(BuildContext context, String id, String title, String description, String city, String country, String region) async {
  UserModel user = context.read<UserModel>();
  String data = jsonEncode(<String, dynamic>{
    "author_id": "${user.id}",
    "title": title,
    "post_date": DateTime.now().toString(),
    "description": description,
    "destinations": [{
                        "city": city,
                        "country": country,
                        "region": region,
                    }]
    
  });
  http.Response res = await httpPut('posts/${id}', data);
  print(res.statusCode);
  print(res.body);
}
