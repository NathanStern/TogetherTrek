import {
	USER_LOGIN_FAIL,
	USER_LOGIN_LOGOUT,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_REGISTER_FAIL,
	USER_REGISTER_SUCCESS,
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
		const { data } = await axios.post('http://localhost:3001/users', {
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
		})
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
			localStorage.setItem('userInfo', JSON.stringify(data))
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
