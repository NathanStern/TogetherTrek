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
import axios from 'axios'
export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		})
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		const users = await axios.get('http://localhost:3001/users')
		console.log(users.data.find((e) => e.id === 1))

		const data = users.data.find(
			(e) => e.email === email && e.password === password
		)
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		})
		if (!data) {
			dispatch({
				type: USER_LOGIN_FAIL,
				payload: 'Login Failed',
			})
		} else {
			localStorage.setItem('userInfo', JSON.stringify(data))
		}
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
		const { data } = await axios.post('http://localhost:3001/users', newUser)
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

export const updateUserProfile = (user) => async (dispatch, getState) => {
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
		console.log(userInfo)
		console.log(userInfo._id)
		console.log(`http://localhost:3001/users/${userInfo._id}`)
		const { data } = await axios.put(
			`http://localhost:3001/users/${userInfo._id}`,
			user
		)

		dispatch({
			type: USER_UPDATE_PROFILE_SUCCESS,
			payload: data,
		})
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
