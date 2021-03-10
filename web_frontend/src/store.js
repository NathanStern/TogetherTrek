import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
	userLoginReducer,
	userRegisterReducer,
	userUpdateProfileReducer,
} from './reducers/userReducers'
import { tripsGetReducer } from './reducers/tripsReducers'

const reducer = combineReducers({
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userUpdateProfile: userUpdateProfileReducer,
	tripsGet: tripsGetReducer,
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
