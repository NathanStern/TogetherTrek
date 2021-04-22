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
  ACCEPT_TRIP_REQUEST,
  ACCEPT_TRIP_SUCCESS,
  ACCEPT_TRIP_FAIL,
  DECLINE_TRIP_REQUEST,
  DECLINE_TRIP_SUCCESS,
  DECLINE_TRIP_FAIL,
  MYTRIPS_JOIN_REQUEST,
  MYTRIPS_JOIN_SUCCESS,
  MYTRIPS_JOIN_FAIL,
  ACCEPT_USER_JOIN_TRIP_FAIL,
  ACCEPT_USER_JOIN_TRIP_SUCCESS,
  ACCEPT_USER_JOIN_TRIP_REQUEST,
  DECLINE_USER_JOIN_TRIP_REQUEST,
  DECLINE_USER_JOIN_TRIP_SUCCESS,
  DECLINE_USER_JOIN_TRIP_FAIL,
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

export const acceptTripRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCEPT_TRIP_REQUEST:
      return { loading: true }
    case ACCEPT_TRIP_SUCCESS:
      return { loading: false, success: true }
    case ACCEPT_TRIP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const declineTripRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case DECLINE_TRIP_REQUEST:
      return { loading: true }
    case DECLINE_TRIP_SUCCESS:
      return { loading: false, success: true }
    case DECLINE_TRIP_FAIL:
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

export const acceptUserJoinTripRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCEPT_USER_JOIN_TRIP_REQUEST:
      return { loading: true }
    case ACCEPT_USER_JOIN_TRIP_SUCCESS:
      return { loading: false, success: true }
    case ACCEPT_USER_JOIN_TRIP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const declineUserJoinTripRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case DECLINE_USER_JOIN_TRIP_REQUEST:
      return { loading: true }
    case DECLINE_USER_JOIN_TRIP_SUCCESS:
      return { loading: false, success: true }
    case DECLINE_USER_JOIN_TRIP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
