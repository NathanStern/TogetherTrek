import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
	userLoginReducer,
	userRegisterReducer,
	userUpdateProfileReducer,
} from './reducers/userReducers'
// import { tripsGetReducer } from './reducers/tripsReducers'
import {
	deleteMyPostReducer,
	getAllPostsReducer,
	getMyPostsReducer,
	updateMyPostReducer,
} from './reducers/postsReducer'

const reducer = combineReducers({
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userUpdateProfile: userUpdateProfileReducer,
	getMyPosts: getMyPostsReducer,
	getAllPosts: getAllPostsReducer,
	deleteMyPost: deleteMyPostReducer,
	updateMyPost: updateMyPostReducer,
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

const initialState = {
	userLogin: { userInfo: userInfoFromStorage },
	myPosts: { myPosts: myPostsFromStorage },
	allPosts: { allPosts: allPostsFromStorage },
}

const middleware = [thunk]

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
