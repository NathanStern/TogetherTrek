import 'dart:convert';

import "package:http/http.dart" as http;

// Replace the <base url of api> with actual url when testing and deploying

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

Future<http.Response> httpPut(String requestExtension, String body) {
  return http.put(Uri.https('<base url of api>', requestExtension),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: body);
}

Future<http.Response> httpDelete(String requestExtension) {
  return http.delete(Uri.https('<base url of api>', requestExtension));
}
