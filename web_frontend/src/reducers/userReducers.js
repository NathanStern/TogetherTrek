import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_GET_FRIENDS_REQUEST,
  USER_GET_FRIENDS_SUCCESS,
  USER_GET_FRIENDS_FAIL,
  USER_REJECT_FRIEND_REQUEST,
  USER_REJECT_FRIEND_SUCCESS,
  USER_REJECT_FRIEND_FAIL,
  USER_ACCEPT_FRIEND_REQUEST,
  USER_ACCEPT_FRIEND_SUCCESS,
  USER_ACCEPT_FRIEND_FAIL,
  USER_REQUEST_FRIEND,
  USER_REQUEST_FRIEND_SUCCESS,
  USER_REQUEST_FRIEND_FAIL,
  USER_GET_MESSAGEBOARDS_REQUEST,
  USER_GET_MESSAGEBOARDS_FAIL,
  USER_GET_MESSAGEBOARDS_SUCCESS,
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGIN_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userGetFriendsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_GET_FRIENDS_REQUEST:
      return { loading: true }
    case USER_GET_FRIENDS_SUCCESS:
      return { loading: false, friendsInfo: action.payload }
    case USER_GET_FRIENDS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userRejectFriendReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REJECT_FRIEND_REQUEST:
      return { loading: true }
    case USER_REJECT_FRIEND_SUCCESS:
      return { loading: false, success: true }
    case USER_REJECT_FRIEND_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const userAcceptFriendReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ACCEPT_FRIEND_REQUEST:
      return { loading: true }
    case USER_ACCEPT_FRIEND_SUCCESS:
      return { loading: false, success: true }
    case USER_ACCEPT_FRIEND_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const userRequestFriendReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REQUEST_FRIEND:
      return { loading: true }
    case USER_REQUEST_FRIEND_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_REQUEST_FRIEND_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userGetMessageBoards = (state = {}, action) => {
  switch (action.type) {
    case USER_GET_MESSAGEBOARDS_REQUEST:
      return { loading: true }
    case USER_GET_MESSAGEBOARDS_SUCCESS:
      return { loading: false, messageBoardsInfo: action.payload }
    case USER_GET_MESSAGEBOARDS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
