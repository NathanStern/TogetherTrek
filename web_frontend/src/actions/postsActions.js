import { path } from '../constants/pathConstant'
import axios from 'axios'
import {
  ALLPOSTS_GET_FAIL,
  ALLPOSTS_GET_REQUEST,
  ALLPOSTS_GET_SUCCESS,
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

const getPost = async (post_id) => {
  try {
    const post = await axios.get(`${path}/posts/${post_id}`)
    console.log(post.data)
    return post.data
  } catch (err) {
    console.log(err)
  }
}

export const getMyPosts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MYPOSTS_GET_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    console.log('user info post ids')
    console.log(userInfo.post_ids)
    let myPosts = []
    userInfo.post_ids.map((el) =>
      getPost(el).then((res) => {
        myPosts.push(res)
      })
    )
    console.log(myPosts)
    const posts = myPosts

    dispatch({
      type: MYPOSTS_GET_SUCCESS,
      payload: posts,
    })
    localStorage.setItem('userPosts', JSON.stringify(posts))
  } catch (error) {
    dispatch({
      type: MYPOSTS_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const deleteMyPost = (post) => async (dispatch, getState) => {
  // const path = 'http://localhost:3001'
  try {
    console.log('deletion start')
    dispatch({
      type: MYPOSTS_DELETE_REQUEST,
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
    newUser.post_ids = userInfo.post_ids.filter((id) => id !== post._id)
    console.log(newUser)
    const { data } = await axios.put(
      `${path}/users/${userInfo._id}`,
      newUser,
      config
    )
    await axios.delete(`${path}/posts/${post._id}`)

    dispatch({
      type: MYPOSTS_DELETE_SUCCESS,
    })
    localStorage.setItem('userPosts', JSON.stringify(newUser.post_ids))
  } catch (error) {
    dispatch({
      type: MYPOSTS_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const updateMyPost = (post) => async (dispatch, getState) => {
  // const path = 'http://localhost:3001'
  try {
    dispatch({
      type: MYPOSTS_UPDATE_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    console.log(post)
    await axios.put(`${path}/posts/${post._id}`, post)
    dispatch({
      type: MYPOSTS_UPDATE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: MYPOSTS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const getPosts = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: ALLPOSTS_GET_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const allPosts = await axios.get(`${path}/posts`)

    dispatch({
      type: ALLPOSTS_GET_SUCCESS,
      payload: allPosts.data,
    })
    localStorage.setItem('allPosts', JSON.stringify(allPosts.data))
  } catch (error) {
    dispatch({
      type: ALLPOSTS_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}
