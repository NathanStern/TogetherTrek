/*
This is the file for the User class which holds all of the data related to a
user and functions related to users
*/

export function User(id, username, email, birthdate, gender, firstName, lastName,
  profilePic, verified, notificationsEnabled, locationEnabled, postIds,
  tripsIds, messageBoardIds, friendIds) {
  this.id = id;
  this.username = username;
  this.email = email;
  this.birthdate = birthdate;
  this.gender = gender;
  this.firstName = firstName;
  this.lastName = lastName;
  this.profilePic = profilePic
  this.verified = verified;
  this.notificationsEnabled = notificationsEnabled;
  this.locationEnabled = locationEnabled;
  this.postIds = postIds;
  this.tripIds = tripIds;
  this.messageBoardIds = messageBoardIds;
  this.friendIds = friendIds;
  this.location = null;

  // field getters are implicit i.e. just use user.id

  // field setters
  this.setEmail = function(newValue) {
    this.email = newValue;
  }
  this.setNotificationsEnabled = function(newValue) {
    this.notificationsEnabled = newValue;
  }
  this.setLocationEnabled = function(newValue) {
    this.locationEnabled = newValue;
  }

  this.addPost = function(postId) {
    this.postIds.push(postId);
  }
  this.addTrip = function(tripId) {
    this.tripIds.push(tripId);
  }
  this.addMessageBoard = function(messageBoardId) {
    this.messageBoardIds.push(messageBoardId);
  }
  this.addFriend = function(friendId) {
    this.friendIds.push(friendId);
  }
}
