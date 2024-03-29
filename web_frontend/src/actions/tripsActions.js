import { path } from '../constants/pathConstant'
import axios from 'axios'
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
  ACCEPT_USER_JOIN_TRIP_REQUEST,
  ACCEPT_USER_JOIN_TRIP_SUCCESS,
  ACCEPT_USER_JOIN_TRIP_FAIL,
  DECLINE_USER_JOIN_TRIP_REQUEST,
  DECLINE_USER_JOIN_TRIP_SUCCESS,
  DECLINE_USER_JOIN_TRIP_FAIL,
} from '../constants/tripsConstants'

const getTrip = async (trip_id) => {
  try {
    const trip = await axios.get(`${path}/trips/${trip_id}`)
    console.log(trip.data)
    return trip.data
  } catch (err) {
    console.log(err)
  }
}

export const getMyTrips = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MYTRIPS_GET_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    console.log('user info trip ids')
    console.log(userInfo.trip_ids)
    let myTrips = []
    userInfo.trip_ids.map((el) =>
      getTrip(el).then((res) => {
        myTrips.push(res)
      })
    )
    console.log(myTrips)
    const trips = myTrips

    dispatch({
      type: MYTRIPS_GET_SUCCESS,
      payload: trips,
    })
    localStorage.setItem('userTrips', JSON.stringify(trips))
  } catch (error) {
    dispatch({
      type: MYTRIPS_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const deleteMyTrip = (trip) => async (dispatch, getState) => {
  // const path = 'http://localhost:3001'
  try {
    console.log('deletion start')
    dispatch({
      type: MYTRIPS_DELETE_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const {
      userLogin: { userInfo },
    } = getState()

    // console.log()
    let newUser = userInfo
    newUser.trip_ids = userInfo.trip_ids.filter((id) => id !== trip._id)
    console.log(newUser)
    const { data } = await axios.put(
      `${path}/users/${userInfo._id}`,
      newUser,
      config
    )
    await axios.delete(`${path}/trips/${trip._id}`)

    dispatch({
      type: MYTRIPS_DELETE_SUCCESS,
    })
    localStorage.setItem('userTrips', JSON.stringify(newUser.trip_ids))
  } catch (error) {
    dispatch({
      type: MYTRIPS_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const updateMyTrip = (trip) => async (dispatch, getState) => {
  // const path = 'http://localhost:3001'
  try {
    dispatch({
      type: MYTRIPS_UPDATE_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    console.log(trip)
    await axios.put(`${path}/trips/${trip._id}`, trip)
    dispatch({
      type: MYTRIPS_UPDATE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: MYTRIPS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const getTrips = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: ALLTRIPS_GET_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const allTrips = await axios.get(`${path}/trips`)

    dispatch({
      type: ALLTRIPS_GET_SUCCESS,
      payload: allTrips.data,
    })
    localStorage.setItem('allTrips', JSON.stringify(allTrips.data))
  } catch (error) {
    dispatch({
      type: ALLTRIPS_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const leaveTrip = (trip) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MYTRIPS_LEAVE_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo.token,
      },
    }
    const data = {
      user_id: userInfo._id,
    }

    const resp = await axios.put(
      `${path}/trips/remove-user/${trip._id}`,
      data,
      config
    )

    dispatch({
      type: MYTRIPS_LEAVE_SUCCESS,
      payload: resp.data,
    })
  } catch (error) {
    dispatch({
      type: MYTRIPS_LEAVE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const acceptTrip = (trip_id) => async (dispatch, getState) => {
  dispatch({
    type: ACCEPT_TRIP_REQUEST,
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

    const { data } = await axios.put(
      `${path}/trips/accept-join/${trip_id}`,
      { requesting_user_id: userInfo._id },
      config
    )
    const user = await axios.put(
      `${path}/users/${userInfo._id}`,
      {
        ...userInfo,
        trip_requests: userInfo.trip_requests.filter((e) => e !== trip_id),
        trip_ids: userInfo.trip_ids.concat(trip_id),
      },
      config
    )
    dispatch({
      type: ACCEPT_TRIP_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: ACCEPT_TRIP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const declineTrip = (trip_id) => async (dispatch, getState) => {
  dispatch({
    type: DECLINE_TRIP_REQUEST,
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

    const { data } = await axios.put(
      `${path}/trips/decline-join/${trip_id}`,
      { requesting_user_id: userInfo._id },
      config
    )
    let tripRequests = userInfo.trip_requests.filter((e) => e !== trip_id)
    console.log(tripRequests)
    console.log(` size is ${tripRequests.length}`)
    const user = await axios.put(
      `${path}/users/${userInfo._id}`,
      {
        ...userInfo,
        trip_requests: tripRequests,
      },
      config
    )
    // console.log(user)
    dispatch({
      type: DECLINE_TRIP_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: DECLINE_TRIP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const joinTrip = (trip) => async (dispatch, getState) => {
  try {
    console.log('JOINING TRIP')
    dispatch({
      type: MYTRIPS_JOIN_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo.token,
      },
    }
    const data = {
      requesting_user_id: userInfo._id,
    }

    await axios.put(`${path}/trips/request-join/${trip._id}`, data, config)

    dispatch({
      type: MYTRIPS_JOIN_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: MYTRIPS_JOIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const acceptUserTripRequest = (trip_id, user_id, user) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: ACCEPT_USER_JOIN_TRIP_REQUEST,
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

    const { data } = await axios.put(
      `${path}/trips/accept-join/${trip_id}`,
      { requesting_user_id: user_id },
      config
    )

    const request = await axios.put(
      `${path}/users/${user._id}`,
      {
        ...user,
        trip_ids: user.trip_ids.concat(trip_id),
      },
      config
    )
    dispatch({
      type: ACCEPT_USER_JOIN_TRIP_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: ACCEPT_USER_JOIN_TRIP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const declineUserTripRequest = (trip_id, user_id) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: DECLINE_USER_JOIN_TRIP_REQUEST,
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

    const { data } = await axios.put(
      `${path}/trips/decline-join/${trip_id}`,
      { requesting_user_id: user_id },
      config
    )

    console.log(data)
    dispatch({
      type: DECLINE_USER_JOIN_TRIP_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: DECLINE_USER_JOIN_TRIP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}
