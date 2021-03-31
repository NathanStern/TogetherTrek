import 'dart:convert';

import "package:http/http.dart" as http;
import 'package:flutter/painting.dart';

// Replace the <base url of api> with actual url when testing and deploying
String baseURL = "together-trek-testing.herokuapp.com";

Future<http.Response> httpGet(String requestExtension) {
  return http.get(Uri.https(baseURL, requestExtension));
}

Future<http.Response> httpGetWithHeaders(
    String requestExtension, Map<String, String> headers) async {
  return http.get(Uri.https(baseURL, requestExtension), headers: headers);
}

Future<http.Response> httpPost(String requestExtension, String body) {
  return http.post(Uri.https(baseURL, requestExtension),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: body);
}

Future<http.Response> httpPut(String requestExtension, String body) {
  return http.put(Uri.https(baseURL, requestExtension),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: body);
}

Future<http.Response> httpDelete(String requestExtension) {
  return http.delete(Uri.https(baseURL, requestExtension),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8'
      });
}

NetworkImage getNetworkImage(String requestExtension) {
  return NetworkImage("https://" + baseURL + "/" + requestExtension);
}
