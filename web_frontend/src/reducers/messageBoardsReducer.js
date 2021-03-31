import {
	MESSAGE_BOARDS_GET_FAIL,
	MESSAGE_BOARDS_GET_REQUEST,
	MESSAGE_BOARDS_GET_SUCCESS,
} from '../constants/messageBoardsConstants'

export const myTripsGetReducer = (state = {}, action) => {
	switch (action.type) {
		case MESSAGE_BOARDS_GET_REQUEST:
			return { loading: true }
		case MESSAGE_BOARDS_GET_SUCCESS:
			return { loading: false, messageBoardsInfo: action.payload }
		case MESSAGE_BOARDS_GET_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
