import {
  USER_LOGIN_FAIL,
  USER_LOGIN_LOGOUT,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_GET_FRIENDS_REQUEST,
  USER_GET_FRIENDS_FAIL,
  USER_GET_FRIENDS_SUCCESS,
  USER_GET_MESSAGEBOARDS_FAIL,
  USER_GET_MESSAGEBOARDS_REQUEST,
  USER_GET_MESSAGEBOARDS_SUCCESS,
  USER_GET_BLOCKED_REQUEST,
  USER_GET_BLOCKED_FAIL,
  USER_GET_BLOCKED_SUCCESS,
} from '../constants/userConstants'
import { path } from '../constants/pathConstant'
import axios from 'axios'
import jwt from 'jwt-decode'
import { sha3_256 } from 'js-sha3'

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })
    console.log(`Hashed password is ${password}`)
    axios
      .post(`${path}/users/login`, { username, password })
      .then((res) => {
        const token = res.data.token
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }

        const user_id = jwt(token)['id']
        console.log(`$user id is ${user_id}`)
        axios
          .get(`${path}/users/${user_id}`)
          .then((res) => {
            let user = res.data
            console.log("USERUSER")
            console.log(user)
            user['token'] = token

            localStorage.setItem('userInfo', JSON.stringify(user))

            dispatch({
              type: USER_LOGIN_SUCCESS,
              payload: user,
            })
          })
          .catch((err) => {
            dispatch({
              type: USER_LOGIN_FAIL,
              payload: 'Login Failed',
            })
          })
      })
      .catch((err) => {
        dispatch({
          type: USER_LOGIN_FAIL,
          payload: 'Login Failed',
        })
      })
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  localStorage.removeItem('userPosts')
  localStorage.removeItem('myToken')
  localStorage.removeItem('encToken')
  localStorage.removeItem('userPassword')
  dispatch({ type: USER_LOGIN_LOGOUT })
}

export const register = (
  username,
  firstName,
  lastName,
  gender,
  birthdate,
  email,
  hashPassword,
  city,
  country
) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })
    console.log('register')
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const newUser = {
      username: username,
      password: hashPassword,
      email: email,
      birthdate: birthdate,
      gender: gender,
      first_name: firstName,
      last_name: lastName,
      profile_pic: {
        upload_date: '',
        link: '',
      },
      verified: 'False',
      notifications_enabled: 'False',
      location_enabled: 'False',
      city: city,
      country: country,
      post_ids: [],
      trip_ids: [],
      message_board_ids: [],
      friend_ids: [],
    }
    const { data } = await axios.post(`${path}/users`, newUser)
    console.log(data)
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

const getFriend = async (friend_id) => {
  try {
    const post = await axios.get(`${path}/users/${friend_id}`)
    console.log(post.data)
    return post.data
  } catch (err) {
    console.log(err)
  }
}

export const getBlockedUsers = () => async (dispatch, getState) => {
  dispatch({
    type: USER_GET_BLOCKED_REQUEST,
  })
  try {
    console.log('Get BLOCKED User ')
    const {
      userLogin: { userInfo },
    } = getState()
    let users = []
    console.log(userInfo)
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    console.log(userInfo)
    userInfo.blocked_ids.map((el) =>
      getFriend(el).then((res) => {
        users.push(res)
      })
    )
    const blocked = users
    dispatch({
      type: USER_GET_BLOCKED_SUCCESS,
      payload: blocked,
    })
  } catch (error) {
    dispatch({
      type: USER_GET_BLOCKED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserFriends = () => async (dispatch, getState) => {
  dispatch({
    type: USER_GET_FRIENDS_REQUEST,
  })
  try {
    console.log('Get User Friends')
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    console.log(userInfo)
    let friends = []
    userInfo.friend_ids.map((el) =>
      getFriend(el).then((res) => {
        friends.push(res)
      })
    )
    const myFriends = friends
    dispatch({
      type: USER_GET_FRIENDS_SUCCESS,
      payload: myFriends,
    })
  } catch (error) {
    dispatch({
      type: USER_GET_FRIENDS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateUserProfile = (
  username,
  firstName,
  lastName,
  gender,
  birthdate,
  email,
  password,
  city,
  country
) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const newUser = {
      location: userInfo.location,
      post_ids: userInfo.post_ids,
      trip_ids: userInfo.trip_ids,
      message_board_ids: userInfo.message_board_ids,
      friend_ids: userInfo.friend_ids,
      _id: userInfo._id,
      username: username,
      password: password,
      email: email,
      birthdate: birthdate,
      gender: gender,
      first_name: firstName,
      last_name: lastName,
      city: city,
      country: country,
      _v: userInfo._v,
    }

    const { data } = await axios.put(
      `${path}/users/${userInfo._id}`,
      newUser,
      config
    )

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserMessageBoards = () => async (dispatch, getState) => {
  dispatch({
    type: USER_GET_MESSAGEBOARDS_REQUEST,
  })
  try {
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo.token,
      },
    }
    const { data } = await axios.get(`${path}/message_boards`, config)
    console.log(data)
    dispatch({
      type: USER_GET_MESSAGEBOARDS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_GET_MESSAGEBOARDS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
