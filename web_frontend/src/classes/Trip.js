/*
This is the file for the Trip class which holds all of the data related to a
trip and functions related to trips
*/

// import statements
export import { getPhotosForTrip } from "../api/ContentsWrapper.js";


// class constructor
function Trip(id, destination, startDate, endDate, creatorId, participantIds) {
  this.id = id;
  this.destination = destination;
  this.startDate = startDate;
  this.endDate = endDate;
  this.creatorId = creatorId;
  this.participantIds = participantIds;
  this.photos = getPhotosForTrip(id);

  // field getters are implicit i.e. just use trip.id

  // field setters
  this.setStartDate = function(newValue) {
    this.startDate = newValue;
  }
  this.setEndDate = function(newValue) {
    this.endDate = newValue;
  }

  this.addParticipant = function(participantId) {
    this.participantIds.push(participantId);
  }
}
