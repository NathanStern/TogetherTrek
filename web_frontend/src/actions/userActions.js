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
} from '../constants/userConstants'
import { path } from '../constants/pathConstant'
import axios from 'axios'
import jwt from 'jwt-decode'

export const login = (username, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		})
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		axios.post(`${path}/users/login`, {username, password})
		.then(res => {
			const token = res.data.token;
			const user_id = jwt(token)['id']

			axios.get(`${path}/users/${user_id}`)
			.then(res => {
				let user = res.data
				console.log("user:")
				console.log(user)
				user['token'] = token
				console.log(user)

				localStorage.setItem('userInfo', JSON.stringify(user))

				dispatch({
					type: USER_LOGIN_SUCCESS,
					payload: user,
				})
			})
			.catch(err => {
				dispatch({
					type: USER_LOGIN_FAIL,
					payload: 'Login Failed',
				})
			})
		})
		.catch(err => {
			dispatch({
				type: USER_LOGIN_FAIL,
				payload: 'Login Failed',
			})
		})
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
	dispatch({ type: USER_LOGIN_LOGOUT })
}

export const register = (
	username,
	firstName,
	lastName,
	gender,
	birthdate,
	email,
	password
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
			password: password,
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
			dispatch({
				type: USER_LOGIN_SUCCESS,
				payload: data,
			})

			localStorage.setItem('userInfo', JSON.stringify(newUser))
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

		// console.log(newUser)
		// console.log(userInfo._id)
		// console.log(`http://localhost:3001/users/${userInfo._id}`)
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
