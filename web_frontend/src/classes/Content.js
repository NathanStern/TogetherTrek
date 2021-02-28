/*
This is the file for the Content class which holds all of the data related
to a message/image and functions related to messages/images
*/

export function Content(id, authorId, postDate, type, data, collection_id) {
  this.id = id;
  this.authorId = authorId;
  this.postDate = postDate;
  this.type = type; // text or image
  this.data = data;
  this.collection_id = collection_id;

  // field getters are implicit i.e. just use content.id

  // fields aren't edittable so setters not needed
}
