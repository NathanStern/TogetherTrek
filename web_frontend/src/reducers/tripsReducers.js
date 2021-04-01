import {
	ALLTRIPS_GET_FAIL,
	ALLTRIPS_GET_REQUEST,
	ALLTRIPS_GET_SUCCESS,
	MYTRIPS_DELETE_FAIL,
	MYTRIPS_DELETE_REQUEST,
	MYTRIPS_DELETE_SUCCESS,
	MYTRIPS_GET_FAIL,
	MYTRIPS_GET_REQUEST,
	MYTRIPS_GET_SUCCESS,
	MYTRIPS_UPDATE_FAIL,
	MYTRIPS_UPDATE_REQUEST,
	MYTRIPS_UPDATE_SUCCESS,
	MYTRIPS_LEAVE_REQUEST,
	MYTRIPS_LEAVE_SUCCESS,
	MYTRIPS_LEAVE_FAIL,
	MYTRIPS_JOIN_REQUEST,
	MYTRIPS_JOIN_SUCCESS,
	MYTRIPS_JOIN_FAIL
} from '../constants/tripsConstants'

export const getMyTripsReducer = (state = {}, action) => {
  switch (action.type) {
    case MYTRIPS_GET_REQUEST:
      return { loading: true }
    case MYTRIPS_GET_SUCCESS:
      return { loading: false, myTrips: action.payload }
    case MYTRIPS_GET_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const getAllTripsReducer = (state = {}, action) => {
  switch (action.type) {
    case ALLTRIPS_GET_REQUEST:
      return { loading: true }
    case ALLTRIPS_GET_SUCCESS:
      return { loading: false, allTrips: action.payload }
    case ALLTRIPS_GET_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const updateMyTripReducer = (state = {}, action) => {
  switch (action.type) {
    case MYTRIPS_UPDATE_REQUEST:
      return { loading: true }
    case MYTRIPS_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case MYTRIPS_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const deleteMyTripReducer = (state = {}, action) => {
  switch (action.type) {
    case MYTRIPS_DELETE_REQUEST:
      return { loading: true }
    case MYTRIPS_DELETE_SUCCESS:
      return { loading: false, success: true }
    case MYTRIPS_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const leaveTripReducer = (state = {}, action) => {
	switch (action.type) {
		case MYTRIPS_LEAVE_REQUEST:
			return { loading: true }
		case MYTRIPS_LEAVE_SUCCESS:
			return { loading: false, success: true }
		case MYTRIPS_LEAVE_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const joinTripReducer = (state = {}, action) => {
	switch (action.type) {
		case MYTRIPS_JOIN_REQUEST:
			return { loading: true }
		case MYTRIPS_JOIN_SUCCESS:
			return { loading: false, success: true }
		case MYTRIPS_JOIN_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
