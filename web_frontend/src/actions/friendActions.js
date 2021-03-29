import {
  USER_ACCEPT_FRIEND_FAIL,
  USER_ACCEPT_FRIEND_REQUEST,
  USER_ACCEPT_FRIEND_SUCCESS,
  USER_REJECT_FRIEND_FAIL,
  USER_REJECT_FRIEND_REQUEST,
  USER_REJECT_FRIEND_SUCCESS,
} from '../constants/userConstants'
import { path } from '../constants/pathConstant'
import axios from 'axios'
export const acceptFriend = (friend_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ACCEPT_FRIEND_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const {
      userLogin: { userInfo },
    } = getState()

    const { data } = await axios.put(
      `${path}/users/accept-friend/${userInfo._id}`,
      { requesting_user_id: friend_id },
      config
    )

    dispatch({
      type: USER_ACCEPT_FRIEND_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: USER_ACCEPT_FRIEND_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const rejectFriend = (friend_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_REJECT_FRIEND_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const {
      userLogin: { userInfo },
    } = getState()

    const { data } = await axios.put(
      `${path}/users/decline-friend/${userInfo._id}`,
      { requesting_user_id: friend_id },
      config
    )

    dispatch({
      type: USER_REJECT_FRIEND_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: USER_REJECT_FRIEND_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}
