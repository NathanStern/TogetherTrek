import 'dart:convert';

import "package:together_trek/api/httpRequest.dart";
import 'package:together_trek/models/PostModel.dart';
import 'package:http/http.dart' as http;

Future<List<PostModel>> getPosts() async {
  http.Response response = await httpGet('posts');

  List<PostModel> posts = [];

  List<dynamic> json = jsonDecode(response.body);

  for (int i = 0; i < json.length; i++) {
    posts.add(PostModel.fromJson(json[i]));
  }

  return posts;
}
