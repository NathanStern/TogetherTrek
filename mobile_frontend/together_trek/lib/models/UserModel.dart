import 'package:together_trek/models/LocationModel.dart';
import 'package:together_trek/models/ProfilePicModel.dart';
import 'package:flutter/material.dart';

/* 
  This is the UserModel class for the application. It defines how all data will
  be stored for a user. Theoretically, some of these fields will only be filled
  if, and only if, the user that was retrieved from the server is the currently
  logged-in user.
*/

class UserModel extends ChangeNotifier {
  String id;
  String username;
  String email;
  String birthdate;
  String gender;
  String firstName;
  String lastName;
  ProfilePicModel profilePic;
  bool verified;
  bool notificationsEnabled;
  bool locationEnabled;
  List<String> postIds;
  List<String> tripIds;
  List<String> messageBoardIds;
  List<String> friendIds;
  LocationModel location;
  bool _empty = false;

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['_id'],
      username: json['username'],
      email: json['email'],
      birthdate: json['birthdate'],
      gender: json['gender'],
      firstName: json['first_name'],
      lastName: json['last_name'],
      profilePic: new ProfilePicModel.empty(),
      verified: false,
      notificationsEnabled: false,
      locationEnabled: false,
      postIds: json['post_ids'],
      tripIds: json['trip_ids'],
      messageBoardIds: json['message_board_ids'],
      friendIds: json['friend_ids'],
      location: new LocationModel(json['location']['coordinates']),
    );
  }

  UserModel.fromUser(UserModel user) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.birthdate = user.birthdate;
    this.gender = user.gender;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.profilePic = user.profilePic;
    this.verified = user.verified;
    this.notificationsEnabled = user.notificationsEnabled;
    this.locationEnabled = user.locationEnabled;
    this.postIds = user.postIds;
    this.tripIds = user.tripIds;
    this.messageBoardIds = user.messageBoardIds;
    this.friendIds = user.friendIds;
    this.location = user.location;
    this._empty = user._empty;
  }

  UserModel.empty() {
    this.id = "";
    this.username = "";
    this.email = "";
    this.birthdate = "";
    this.gender = "";
    this.firstName = "";
    this.lastName = "";
    this.profilePic = null;
    this.verified = false;
    this.notificationsEnabled = false;
    this.locationEnabled = false;
    this.postIds = [];
    this.tripIds = [];
    this.messageBoardIds = [];
    this.friendIds = [];
    this.location = null;
    this._empty = true;
  }

  UserModel(
      {this.id,
      this.username,
      this.email,
      this.birthdate,
      this.gender,
      this.firstName,
      this.lastName,
      this.profilePic,
      this.verified,
      this.notificationsEnabled,
      this.locationEnabled,
      this.postIds,
      this.tripIds,
      this.messageBoardIds,
      this.friendIds,
      this.location});

  bool isEmpty() {
    return _empty;
  }

  // All of the getters are implicit

  void setAllFields(
      String id,
      String username,
      String email,
      String birthdate,
      String gender,
      String firstName,
      String lastName,
      ProfilePicModel profilePic,
      bool verified,
      bool notificationsEnabled,
      bool locationEnabled,
      List<String> postIds,
      List<String> tripIds,
      List<String> messageBoardIds,
      List<String> friendIds,
      LocationModel location) {
    // the date needs to be parsed
    this.id = id;
    this.username = username;
    this.email = email;
    this.birthdate = birthdate;
    this.gender = gender;
    this.firstName = firstName;
    this.lastName = lastName;
    this.profilePic = profilePic;
    this.verified = verified;
    this.notificationsEnabled = notificationsEnabled;
    this.locationEnabled = locationEnabled;
    this.postIds = postIds;
    this.tripIds = tripIds;
    this.messageBoardIds = messageBoardIds;
    this.friendIds = friendIds;
    this.location = location;
    this._empty = false;

    notifyListeners();
  }

  void setEmail(String newEmail) {
    this.email = newEmail;
    notifyListeners();
  }

  void setNotificationsEnabled(bool newValue) {
    this.notificationsEnabled = newValue;
    notifyListeners();
  }

  void setLocationEnabled(bool newValue) {
    this.locationEnabled = newValue;
    notifyListeners();
  }

  void addPost(String postId) {
    this.postIds.add(postId);
    notifyListeners();
  }

  void removePost(String postId) {
    this.postIds.remove(postId);
    notifyListeners();
  }

  void addTrip(String tripId) {
    this.tripIds.add(tripId);
    notifyListeners();
  }

  void removeTrip(String tripId) {
    this.tripIds.remove(tripId);
    notifyListeners();
  }

  void addMessageBoard(String messageBoardId) {
    this.messageBoardIds.add(messageBoardId);
    notifyListeners();
  }

  void removeMessageBoard(String messageBoardId) {
    this.messageBoardIds.remove(messageBoardId);
    notifyListeners();
  }

  void addFriend(String friendId) {
    this.friendIds.add(friendId);
    notifyListeners();
  }

  void removeFriend(String friendId) {
    this.friendIds.remove(friendId);
    notifyListeners();
  }
}
