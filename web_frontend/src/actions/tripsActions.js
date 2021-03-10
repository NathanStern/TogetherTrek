import axios from 'axios'
import { TRIPS_GET_REQUEST } from '../constants/userConstants'
export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: TRIPS_GET_REQUEST,
		})

		const users = await axios.get('http://localhost:3001/trips')
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
