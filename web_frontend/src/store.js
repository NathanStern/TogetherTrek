import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
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
import { myTripsGetReducer } from './reducers/tripsReducers'
const reducer = combineReducers({
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userUpdateProfile: userUpdateProfileReducer,
	getMyPosts: getMyPostsReducer,
	getAllPosts: getAllPostsReducer,
	deleteMyPost: deleteMyPostReducer,
	updateMyPost: updateMyPostReducer,
	getFriends: userGetFriendsReducer,
	getMyTrips: myTripsGetReducer,
	rejectFriendRequest: userRejectFriendReducer,
	acceptFriendRequest: userAcceptFriendReducer,
	// allTripsGet: allTripsGetReducer,
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

const tokenFromStorage = localStorage.getItem('myToken')
	? JSON.parse(localStorage.getItem('myToken'))
	: null

const initialState = {
	userLogin: { userInfo: userInfoFromStorage },
	myPosts: { myPosts: myPostsFromStorage },
	allPosts: { allPosts: allPostsFromStorage },
	token: { token: tokenFromStorage },
}

const middleware = [thunk]

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
