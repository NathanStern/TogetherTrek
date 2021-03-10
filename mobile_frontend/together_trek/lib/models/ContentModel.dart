class ContentModel {
  String id;
  String authorId;
  String postDate;
  String type; // text or image
  String data; // text or url to image
  String collectionId;

  ContentModel(String id, String authorId, String postDate, String type,
      String data, String collectionId) {
    this.id = id;
    this.authorId = authorId;
    this.postDate = postDate;
    this.type = type;
    this.data = data;
    this.collectionId = collectionId;
  }

  // getters are implicit

  // none of the fields are editable, so no setters are needed
}
