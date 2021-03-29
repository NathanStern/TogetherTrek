import {
  PROFILE_ADD_MESSAGEBOARD_FAIL,
  PROFILE_ADD_MESSAGEBOARD_REQUEST,
  PROFILE_ADD_MESSAGEBOARD_SUCCESS,
} from '../constants/profilesConstants'
import { path } from '../constants/pathConstant'
import axios from 'axios'
import { Children } from 'react'

export const addMessageBoard = (user_ids, messageBoardId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: PROFILE_ADD_MESSAGEBOARD_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const {
      getFriends: { friendsInfo },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    console.log(friendsInfo)
    console.log(user_ids)

    const messages = user_ids.map((el) => {
      let friendInfo = friendsInfo.find((x) => x._id === el)
      if (el === userInfo._id) {
        friendInfo = userInfo
      }
      friendInfo.message_board_ids.push(messageBoardId)
      console.log(friendInfo)
      return axios
        .put(`${path}/users/${el}`, friendInfo)
        .then((res) => console.log(res))
    })

    Promise.all(messages).then((res) =>
      console.log(`No idea what i've done ${res}`)
    )
    dispatch({
      type: PROFILE_ADD_MESSAGEBOARD_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: PROFILE_ADD_MESSAGEBOARD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
