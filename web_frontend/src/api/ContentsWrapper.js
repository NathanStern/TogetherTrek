/*
This is the file for making requests to the API related to Content data
*/

// import statements
import { makeGetRequest } from "./Interface.js";
import { makePostRequest } from "./Interface.js";
import { makePutRequest } from "./Interface.js";
import { makeDeleteRequest } from "./Interface.js";


export function getMessagesForBoard(messageBoardId) {
  // Call the get request function from Interface.js on the
  // message_board_contents endpoint with the messageBoardId in the data
  return null;
}

export function getPhotosForTrip(tripId) {
  // Call the get request function from Interface.js on the trips_contents
  // endpoint with the tripId in the data
  return null;
}
