class ContentModel {
  String id;
  String authorId;
  String postDate;
  String type; // text or image
  String data; // text or url to image
  String collection_id;

  ContentModel(String id, String authorId, String postDate, String type,
      String data, String collection_id) {
    this.id = id;
    this.authorId = authorId;
    this.postDate = postDate;
    this.type = type;
    this.data = data;
    this.collection_id = collection_id;
  }

  // getters are implicit

  // none of the fields are editable, so no setters are needed
}
