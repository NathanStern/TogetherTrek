class ContentModel {
  String id;
  String authorId;
  String postDate;
  String type; // text or image
  String data; // text or url to image
  String collectionId;

  ContentModel(
      {this.id,
      this.authorId,
      this.postDate,
      this.type,
      this.data,
      this.collectionId});

  factory ContentModel.fromJson(Map<String, dynamic> json) {
    return ContentModel(
        id: json["_id"],
        authorId: json["author_id"],
        postDate: json["post_date"],
        type: json["type"],
        data: json["data"],
        collectionId: json["message_board_id"]);
  }

  // getters are implicit

  // none of the fields are editable, so no setters are needed
}
