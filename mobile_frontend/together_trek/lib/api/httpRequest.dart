import 'dart:convert';

import "package:http/http.dart" as http;

Future<http.Response> httpGet(String requestExtension) {
  return http.get(Uri.https('<base url of api>', requestExtension));
}

Future<http.Response> httpPost(String requestExtension, String body) {
  return http.post(Uri.https('<base url of api>', requestExtension),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: body);
}
