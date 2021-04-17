import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { profileAddMessageBoardReducer } from './reducers/profilesReducer'
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userGetFriendsReducer,
  userRejectFriendReducer,
  userAcceptFriendReducer,
  userRequestFriendReducer,
  userGetMessageBoards,
} from './reducers/userReducers'
import {
  deleteMyPostReducer,
  getAllPostsReducer,
  getMyPostsReducer,
  updateMyPostReducer,
} from './reducers/postsReducer'
import {
  getAllExpensesReducer,
} from './reducers/expenseReducer'
import {
  getMyTripsReducer,
  getAllTripsReducer,
  updateMyTripReducer,
  deleteMyTripReducer,
  leaveTripReducer,
  joinTripReducer,
  acceptTripRequestReducer,
  declineTripRequestReducer,
} from './reducers/tripsReducers'

const reducer = combineReducers({
  getFriends: userGetFriendsReducer,
  getMyTrips: getMyTripsReducer,
  rejectFriendRequest: userRejectFriendReducer,
  acceptFriendRequest: userAcceptFriendReducer,
  requestFriend: userRequestFriendReducer,
  profileAddMessageBoard: profileAddMessageBoardReducer,
  getMyMessageBoards: userGetMessageBoards,
  acceptTripRequest: acceptTripRequestReducer,
  declineTripRequest: declineTripRequestReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdateProfile: userUpdateProfileReducer,
  getMyPosts: getMyPostsReducer,
  getAllPosts: getAllPostsReducer,
  deleteMyPost: deleteMyPostReducer,
  updateMyPost: updateMyPostReducer,
  getMyTrips: getMyTripsReducer,
  getAllTrips: getAllTripsReducer,
  updateMyTrip: updateMyTripReducer,
  deleteMyTrip: deleteMyTripReducer,
  leaveTrip: leaveTripReducer,
  joinTrip: joinTripReducer,
  getAllExpenses: getAllExpensesReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
