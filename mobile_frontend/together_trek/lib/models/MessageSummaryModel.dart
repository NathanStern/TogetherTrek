import 'package:together_trek/models/ContentModel.dart';
import 'package:together_trek/models/MessageBoardParticipantModel.dart';

class MessageSummaryModel {
  String id;
  List<dynamic> userIds;
  List<MessageBoardParticipantModel> otherUsers;
  ContentModel latestMessage;

  MessageSummaryModel(
      {this.id, this.userIds, this.otherUsers, this.latestMessage});

  factory MessageSummaryModel.fromJson(Map<String, dynamic> json) {
    List<MessageBoardParticipantModel> users = [];
    for (int i = 0; i < json["other_users"].length; i++) {
      users.add(MessageBoardParticipantModel.fromJson(json["other_users"][i]));
    }

    ContentModel message;

    if (json["latest_message"].isEmpty) {
      message = ContentModel.empty();
    } else {
      message = ContentModel.fromJson(json["latest_message"]);
    }
    return MessageSummaryModel(
        id: json["_id"],
        userIds: json["user_ids"],
        otherUsers: users,
        latestMessage: message);
  }
}
