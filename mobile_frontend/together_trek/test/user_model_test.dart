import 'package:together_trek/models/UserModel.dart';
import 'package:flutter_test/flutter_test.dart';
import 'dart:math';

void main() {
  UserModel user = new UserModel(
      "testID",
      "testUsername",
      "test@example.com",
      "12/30/2000",
      "Male",
      "Test",
      "User",
      null,
      true,
      true,
      true,
      [],
      [],
      [],
      [],
      null);

  test('Check to see if all fields are set correctly upon creation', () {
    expect(user.id, "testID");
    expect(user.username, "testUsername");
    expect(user.email, "test@example.com");
    expect(user.birthdate, "12/30/2000");
    expect(user.gender, "Male");
    expect(user.firstName, "Test");
    expect(user.lastName, "User");
    expect(user.profilePic, null);
    expect(user.verified, true);
    expect(user.notificationsEnabled, true);
    expect(user.locationEnabled, true);
    expect(user.postIds.isEmpty, true);
    expect(user.tripIds.isEmpty, true);
    expect(user.messageBoardIds.isEmpty, true);
    expect(user.friendIds.isEmpty, true);
    expect(user.location, null);
  });

  test('Check to see if the setEmail() method works as expected', () {
    expect(user.email, "test@example.com");

    user.setEmail("testing@exampledomain.com");

    expect(user.email, "testing@exampledomain.com");

    user.setEmail("test@example.com");

    expect(user.email, "test@example.com");
  });

  test('Check to see if the setNotificationsEnabled() method works as expected',
      () {
    expect(user.notificationsEnabled, true);

    user.setNotificationsEnabled(false);

    expect(user.notificationsEnabled, false);

    user.setNotificationsEnabled(true);

    expect(user.notificationsEnabled, true);
  });

  test('Check to see if the setLocationEnabled() method works as expected', () {
    expect(user.locationEnabled, true);

    user.setLocationEnabled(false);

    expect(user.locationEnabled, false);

    user.setLocationEnabled(true);

    expect(user.locationEnabled, true);
  });

  test('Check to see if the addPost() method works as expected', () {
    expect(user.postIds.isEmpty, true);

    List<String> newPostIds = [];

    Random gen = new Random();

    int numTests = gen.nextInt(50);

    for (int i = 0; i < numTests; i++) {
      newPostIds.add("${i}");
      user.addPost("${i}");
    }

    for (int i = 0; i < newPostIds.length; i++) {
      expect(user.postIds[i], newPostIds[i]);
    }

    user.postIds = [];
    newPostIds = [];

    expect(newPostIds.length, 0);
    expect(user.postIds.length, 0);
  });

  test('Check to see if the removePost() method works as expected', () {
    expect(user.postIds.isEmpty, true);

    Random gen = new Random();

    int numTests = gen.nextInt(50);

    List<String> testArr = [];

    for (int i = 0; i < numTests; i++) {
      user.addPost("${i}");
      testArr.add("${i}");
    }

    for (int i = 0; i < numTests / 2; i++) {
      int removeTest = gen.nextInt(numTests - 1 - i);

      String toRemove = testArr[removeTest];

      user.removePost(toRemove);
      testArr.remove(toRemove);

      for (int j = 0; j < testArr.length; j++) {
        expect(user.postIds[j], testArr[j]);
      }
    }

    int removeLength = user.postIds.length;

    for (int i = 0; i < removeLength; i++) {
      user.removePost(user.postIds[0]);
    }

    expect(user.postIds.length, 0);
  });
}
