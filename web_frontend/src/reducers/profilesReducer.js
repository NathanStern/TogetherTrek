import {
	PROFILE_GET_FAIL,
	PROFILE_GET_REQUEST,
	PROFILE_GET_SUCCESS,
} from '../constants/profilesConstants'

export const profileGetReducer = (state = {}, action) => {
	switch (action.type) {
		case PROFILE_GET_REQUEST:
			return { loading: true }
		case PROFILE_GET_SUCCESS:
			return { loading: false, profileInfo: action.payload }
		case PROFILE_GET_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
