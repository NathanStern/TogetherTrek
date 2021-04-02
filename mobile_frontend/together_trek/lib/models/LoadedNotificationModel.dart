import 'package:flutter/material.dart';

import 'package:together_trek/models/NotificationModel.dart';

class LoadedNotificationModel extends ChangeNotifier {
  List<NotificationModel> notification = [];
  LoadedNotificationModel({this.notification});

  LoadedNotificationModel.empty() {
    this.notification = [];
  }

  void resetNotification(List<NotificationModel> notification) {
    this.notification = List.from(notification.reversed);
    notifyListeners();
  }

  void removeNotification(id) {
    for (var i = 0; i <= this.notification.length; i++) {
      if (this.notification[i].senderId == id) {
        this.notification.removeAt(i);
        break;
      }
    }
    notifyListeners();
  }
}
