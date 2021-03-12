import {
	MYPOSTS_DELETE_FAIL,
	MYPOSTS_DELETE_REQUEST,
	MYPOSTS_DELETE_SUCCESS,
	MYPOSTS_GET_FAIL,
	MYPOSTS_GET_REQUEST,
	MYPOSTS_GET_SUCCESS,
	MYPOSTS_UPDATE_FAIL,
	MYPOSTS_UPDATE_REQUEST,
	MYPOSTS_UPDATE_SUCCESS,
} from '../constants/postsConstants'

export const getMyPostsReducer = (state = {}, action) => {
	switch (action.type) {
		case MYPOSTS_GET_REQUEST:
			return { loading: true }
		case MYPOSTS_GET_SUCCESS:
			return { loading: false, myPosts: action.payload }
		case MYPOSTS_GET_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const updateMyPostReducer = (state = {}, action) => {
	switch (action.type) {
		case MYPOSTS_UPDATE_REQUEST:
			return { loading: true }
		case MYPOSTS_UPDATE_SUCCESS:
			return { loading: false, success: true }
		case MYPOSTS_UPDATE_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const deleteMyPostReducer = (state = {}, action) => {
	switch (action.type) {
		case MYPOSTS_DELETE_REQUEST:
			return { loading: true }
		case MYPOSTS_DELETE_SUCCESS:
			return { loading: false, success: true }
		case MYPOSTS_DELETE_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
