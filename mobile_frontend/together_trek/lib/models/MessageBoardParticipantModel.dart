class MessageBoardParticipantModel {
  String id;
  String name;

  MessageBoardParticipantModel({this.id, this.name});

  factory MessageBoardParticipantModel.fromJson(Map<String, dynamic> json) {
    return MessageBoardParticipantModel(id: json["id"], name: json["name"]);
  }

  Map<String, dynamic> toJson() => {'name': this.name, 'id': this.id};
}
