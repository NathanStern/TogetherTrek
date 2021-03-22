import {
	MYTRIPS_GET_FAIL,
	MYTRIPS_GET_REQUEST,
	MYTRIPS_GET_SUCCESS,
} from '../constants/tripsConstants'

export const myTripsGetReducer = (state = {}, action) => {
	switch (action.type) {
		case MYTRIPS_GET_REQUEST:
			return { loading: true }
		case MYTRIPS_GET_SUCCESS:
			return { loading: false, tripsInfo: action.payload }
		case MYTRIPS_GET_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
