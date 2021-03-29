import 'package:together_trek/models/ContentModel.dart';

class MessageBoardModel {
  String id;
  List<String> userIds;
  List<ContentModel> messages;

  MessageBoardModel(
      String id, List<String> userIds, List<ContentModel> messages) {
    this.id = id;
    this.userIds = userIds;
    this.messages = messages;
  }

  // getters are implicit

  void addUser(String userId) {
    this.userIds.add(userId);
  }
}
