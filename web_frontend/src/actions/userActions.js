import {
	USER_LOGIN_FAIL,
	USER_LOGIN_LOGOUT,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_REGISTER_FAIL,
	USER_REGISTER_SUCCESS,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCCESS,
	USER_UPDATE_PROFILE_FAIL,
	USER_GET_FRIENDS_REQUEST,
	USER_GET_FRIENDS_FAIL,
	USER_GET_FRIENDS_SUCCESS,
} from '../constants/userConstants'
import { path } from '../constants/pathConstant'
import axios from 'axios'
let token = ''
export const login = (tok, tok2) => async (dispatch) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		})
		console.log(token)
		token = tok
		const { data } = await axios.get(`${path}/users/${token.id}`)
		console.log(data)
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: { ...data, token: tok2 },
		})
		localStorage.setItem('userInfo', JSON.stringify(data))
		localStorage.setItem('myToken', JSON.stringify(tok))
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		})
	}
}

export const logout = () => (dispatch) => {
	localStorage.removeItem('userInfo')
	localStorage.removeItem('userPosts')
	localStorage.removeItem('myToken')
	dispatch({ type: USER_LOGIN_LOGOUT })
}

export const register = (
	username,
	firstName,
	lastName,
	gender,
	birthdate,
	email,
	hashPassword
) => async (dispatch) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		})
		console.log('register')
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		const newUser = {
			username: username,
			password: hashPassword,
			email: email,
			birthdate: birthdate,
			gender: gender,
			first_name: firstName,
			last_name: lastName,
			profile_pic: {
				upload_date: '',
				link: '',
			},
			verified: 'False',
			notifications_enabled: 'False',
			location_enabled: 'False',
			location: {
				type: 'Point',
				coordinates: [],
			},
			post_ids: [],
			trip_ids: [],
			message_board_ids: [],
			friend_ids: [],
		}
		const { data } = await axios.post(`${path}/users`, newUser)
		console.log(data)
		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data,
		})

		if (!data) {
			dispatch({
				type: USER_REGISTER_FAIL,
				payload: 'ERROR',
			})
		} else {
			// dispatch({
			// 	type: USER_LOGIN_SUCCESS,
			// 	payload: data,
			// })
			// localStorage.setItem('userInfo', JSON.stringify(newUser))
			// localStorage.setItem(
			// 	'userInfo',
			// 	JSON.stringify([...newUser, { _id: data }])
			// )
		}
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		})
	}
}

const getFriend = async (friend_id) => {
	try {
		const post = await axios.get(`${path}/users/${friend_id}`)
		console.log(post.data)
		return post.data
	} catch (err) {
		console.log(err)
	}
}

export const getUserFriends = () => async (dispatch, getState) => {
	dispatch({
		type: USER_GET_FRIENDS_REQUEST,
	})
	try {
		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		let friends = []
		userInfo.friend_ids.map((el) =>
			getFriend(el).then((res) => {
				friends.push(res)
			})
		)
		const myFriends = friends
		dispatch({
			type: USER_GET_FRIENDS_SUCCESS,
			payload: myFriends,
		})
	} catch (error) {
		dispatch({
			type: USER_GET_FRIENDS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const updateUserProfile = (
	username,
	firstName,
	lastName,
	gender,
	birthdate,
	email,
	password
) => async (dispatch, getState) => {
	console.log(username, firstName, lastName, gender, birthdate, email, password)
	try {
		dispatch({
			type: USER_UPDATE_PROFILE_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const newUser = {
			location: userInfo.location,
			post_ids: userInfo.post_ids,
			trip_ids: userInfo.trip_ids,
			message_board_ids: userInfo.message_board_ids,
			friend_ids: userInfo.friend_ids,
			_id: userInfo._id,
			username: username,
			password: password,
			email: email,
			birthdate: birthdate,
			gender: gender,
			first_name: firstName,
			last_name: lastName,
			_v: userInfo._v,
		}

		const { data } = await axios.put(
			`${path}/users/${userInfo._id}`,
			newUser,
			config
		)

		dispatch({
			type: USER_UPDATE_PROFILE_SUCCESS,
			payload: data,
		})
		localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		dispatch({
			type: USER_UPDATE_PROFILE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
