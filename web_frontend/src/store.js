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
  userGetMessageBoards,
} from './reducers/userReducers'
import {
  deleteMyPostReducer,
  getAllPostsReducer,
  getMyPostsReducer,
  updateMyPostReducer,
} from './reducers/postsReducer'
import {
	getMyTripsReducer,
	getAllTripsReducer,
	updateMyTripReducer,
	deleteMyTripReducer,
	leaveTripReducer,
  joinTripReducer
} from './reducers/tripsReducers'

const reducer = combineReducers({
  getFriends: userGetFriendsReducer,
  getMyTrips: getMyTripsReducer,
  rejectFriendRequest: userRejectFriendReducer,
  acceptFriendRequest: userAcceptFriendReducer,
  profileAddMessageBoard: profileAddMessageBoardReducer,
  getMyMessageBoards: userGetMessageBoards,
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
  joinTrip: joinTripReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
	userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
