/*
This is the file for the MessageBoard class which holds all of the data related
to a message board and functions related to message boards
*/

// import statements
import { getMessagesForBoard } from "../api/ContentsWrapper.js";


// class constructor
export function MessageBoard(id, userIds) {
  this.id = id;
  this.userIds = userIds;
  this.messages = getMessagesForBoard(id);

  // field getters are implicit i.e. just use messageBoard.id

  // field setters
  this.addUser = function(userId) {
    this.userIds.push(userId);
  }
}
