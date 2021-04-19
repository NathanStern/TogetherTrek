import 'dart:convert';
import 'dart:io';

import "package:http/http.dart" as http;
import 'package:http_parser/http_parser.dart';
import 'package:flutter/painting.dart';

// Replace the <base url of api> with actual url when testing and deploying
// String baseURL = "together-trek-testing.herokuapp.com";
String baseURL = "13b30ed5c523.ngrok.io";

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

Future<int> httpPutFile(String requestExtension, File file) async {
  var uri = Uri.parse("https://$baseURL$requestExtension");
  var request = new http.MultipartRequest("PUT", uri);

  var stream = new http.ByteStream(file.openRead());
  var length = await file.length();

  var multiPartFile = new http.MultipartFile(
    'file',
    stream,
    length,
  );

  // request.files.add(new http.MultipartFile.fromBytes(
  //     'file', file.readAsBytesSync(),
  //     contentType: new MediaType('image', 'jpeg')));
  //request.files.add(new http.MultipartFile.fromString('type', "image/jpeg"));

  request.files.add(multiPartFile);

  // int responseCode;
  // request.send().then((response) {
  //   print(response.statusCode);
  //   print(response.reasonPhrase);
  //   responseCode = response.statusCode;
  // });
  //

  http.Response response = await http.Response.fromStream(await request.send());
  print(response.body);

  return response.statusCode;
}
