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
	leaveTripReducer
} from './reducers/tripsReducers'

const reducer = combineReducers({
  getFriends: userGetFriendsReducer,
  getMyTrips: getMyTripsReducer,
  rejectFriendRequest: userRejectFriendReducer,
  acceptFriendRequest: userAcceptFriendReducer,
  profileAddMessageBoard: profileAddMessageBoardReducer,
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
	leaveTrip: leaveTripReducer

})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const myPostsFromStorage = localStorage.getItem('userPosts')
  ? JSON.parse(localStorage.getItem('userPosts'))
  : null

const allPostsFromStorage = localStorage.getItem('allPosts')
  ? JSON.parse(localStorage.getItem('allPosts'))
  : null

const myTripsFromStorage = localStorage.getItem('userTrips')
	? JSON.parse(localStorage.getItem('userTrips'))
	: null

const allTripsFromStorage = localStorage.getItem('allTrips')
	? JSON.parse(localStorage.getItem('allTrips'))
	: null

const initialState = {
	userLogin: { userInfo: userInfoFromStorage },
	getMyPosts: { myPosts: myPostsFromStorage },
	getAllPosts: { allPosts: allPostsFromStorage },
	getMyTrips: { myTrips: myTripsFromStorage },
	getAllTrips: { allTrips: allTripsFromStorage }
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
