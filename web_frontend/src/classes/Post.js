/*
This is the file for the Post class which holds all of the data related to a
post and functions related to posts
*/

export function Post(id, authorId, title, description, postDate, destinations, tripStartDate, tripEndDate) {
  this.id = id;
  this.authorId = authorId;
  this.title = title;
  this.description = description;
  this.postDate = postDate;
  this.destinations = destinations;
  this.tripStartDate = tripStartDate;
  this.tripEndDate = tripEndDate;

  // field getters are implicit i.e. just use post.id

  // field setters
  this.setTitle = function(newValue) {
    this.title = newValue;
  }
  this.setDescription = function(newValue) {
    this.description = newValue;
  }
  this.setDetinations = function(newValue) {
    this.destinations = newValue;
  }
  this.setTripStartDate = function(newValue) {
    this.tripStartDate = newValue;
  }
  this.setTripEndDate = function(newValue) {
    this.tripEndDate = newValue;
  }
}
