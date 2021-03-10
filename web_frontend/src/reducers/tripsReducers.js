import {
	TRIPS_GET_FAIL,
	TRIPS_GET_REQUEST,
	TRIPS_GET_SUCCESS,
} from '../constants/userConstants'

export const tripsGetReducer = (state = {}, action) => {
	switch (action.type) {
		case TRIPS_GET_REQUEST:
			return { loading: true }
		case TRIPS_GET_SUCCESS:
			return { loading: false, userInfo: action.payload }
		case TRIPS_GET_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
