import 'package:flutter/material.dart';

class TokenModel extends ChangeNotifier {
  String token;

  TokenModel({this.token});

  void setFields(String token) {
    this.token = token;
    notifyListeners();
  }
}
