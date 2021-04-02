import 'dart:convert';

class NotificationModel {
  @override
  String senderId;
  String title;
  String description;
  String date;

  NotificationModel({this.senderId, this.title, this.description, this.date});

  factory NotificationModel.fromJson(Map<String, dynamic> json) {
    List<NotificationModel> notification = [];

    return NotificationModel(
      senderId: json['_id'],
      title: json['title'],
      description: json['description'],
      date: json['date'],
    );
  }
}
