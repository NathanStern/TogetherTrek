import axios from 'axios'
import {
	MYTRIPS_GET_FAIL,
	MYTRIPS_GET_REQUEST,
	MYTRIPS_GET_SUCCESS,
} from '../constants/tripsConstants'
import { path } from '../constants/pathConstant'
export const getAllTrips = (email, password) => async (dispatch) => {}
const token = JSON.parse(localStorage.getItem('encToken'))

export const getMyTrips = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: MYTRIPS_GET_REQUEST,
		})
		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${token}`,
			},
		}
		console.log(` token is ${token}`)

		const { data } = await axios.get(`${path}/message_boards`, config)

		dispatch({
			type: MYTRIPS_GET_SUCCESS,
			tripsInfo: data,
		})
	} catch (error) {
		dispatch({
			type: MYTRIPS_GET_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
