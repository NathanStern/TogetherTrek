import '../index.css'
import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Container, Card } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Post from '../components/Post'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getMyPosts, deleteMyPost } from '../actions/postsActions'
import { requestFriend } from '../actions/friendActions'
import {
  getBlockedUsers,
  getFriend,
  updateUserProfile,
} from '../actions/userActions'
import { path } from '../constants/pathConstant'

const OtherProfileScreen = ({ location, history, useParams }) => {
  const dispatch = useDispatch()
  const [isBlocked, setIsBlocked] = useState(false)
  const [userBlockedYou, setUserBlockedYou] = useState(false)
  const [profileInfo, setProfileInfo] = useState({})
  const [friend, setFriend] = useState(false)
  const [requested, setRequested] = useState(false)
  const [friendBtnText, setFriendBtnText] = useState('Add')
  const [profilePic, setProfilePic] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  )

  // Get the id of the user who's profile is being viewed and get the active user
  const { pathname } = useLocation()
  const id = pathname.split('/')[2]

  // Get the profile data of the other user's profile and set local values
  const { userInfo } = useSelector((state) => state.userLogin)

  // Ensure user was retrieved
  const redirect = '/'
  useEffect(() => {
    if (!profileInfo) {
      history.push(redirect)
    }
  }, [history, profileInfo, redirect])

  useEffect(() => {
    axios.get(`${path}/users/${id}`).then((resp) => {
      const user = resp.data
      const isFriend = user.friend_ids.includes(userInfo._id)
      const hasRequested = user.friend_requests.includes(userInfo._id)
      setFriend(isFriend ? true : false)
      setRequested(hasRequested ? true : false)
      setFriendBtnText(isFriend ? 'Remove' : hasRequested ? 'Requested' : 'Add')
      let pic =
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
      if (profileInfo.profile_pic) {
        pic = path + `/users/profile-pic/${profileInfo._id}`
        setProfilePic(profilePic)
      }
      setProfileInfo(user)
      if (
        userInfo.blocked_ids.length > 0 &&
        userInfo.blocked_ids.filter((e) => e == id).length > 0
      ) {
        setIsBlocked(true)
      }
      if (
        user.blocked_ids.length > 0 &&
        user.blocked_ids.filter((e) => e == userInfo._id).length > 0
      ) {
        setUserBlockedYou(true)
      }
    })
  }, [])
  const friendButtonHandler = (e) => {
    if (friend) {
      console.log('Not yet implemented')
    } else if (!requested) {
      dispatch(requestFriend(profileInfo._id))
      setFriendBtnText('Requested')
    }
  }
  const blockButtonHandler = async (e) => {
    e.preventDefault()
    // console.log('youre tryint to block, not yet implemented')
    const { data } = await axios.put(
      `${path}/users/block-user/${userInfo._id}`,
      {
        requesting_user_id: id,
      }
    )
    dispatch(getBlockedUsers())
    setIsBlocked(!isBlocked)

    console.log(data)
    // let user = {...userInfo, blocked_users = userInfo.blocked_users.concat(profileInfo._id)}
    // dispatch(updateUserProfile(user))
  }

  const unblockButtonHandler = async (e) => {
    e.preventDefault()
    const { data } = await axios.put(
      `${path}/users/unblock-user/${userInfo._id}`,
      {
        requesting_user_id: id,
      }
    )
    dispatch(getBlockedUsers())
    setIsBlocked(!isBlocked)
    console.log(data)
    // let user = {...userInfo, blocked_users = userInfo.filter(e=>e!==profileInfo._id)}
    // dispatch(updateUserProfile(user))
  }
  const messageButtonHandler = (e) => {
    console.log('Not yet implemented')
  }

  return (
    <>
      {profileInfo && !userBlockedYou && (
        <Row>
          <Col md={3}>
            <h2>User Profile</h2>
            <img src={profilePic} alt='profile pic' width='100' height='100' />
            <div>Username: {profileInfo.username}</div>
            <div>First Name: {profileInfo.first_name}</div>
            <div>Last Name: {profileInfo.last_name}</div>
            <div>Birthday: {profileInfo.birthdate}</div>
            <div>Gender: {profileInfo.gender}</div>
            <Button
              variant='primary'
              className='half-button'
              onClick={(e) => friendButtonHandler(e)}
            >
              {friendBtnText}
            </Button>
            <Button
              variant='primary'
              className='half-button'
              onClick={(e) => friendButtonHandler(e)}
            >
              Message
            </Button>
            {isBlocked ? (
              <Button
                variant='primary'
                className='half-button'
                onClick={(e) => unblockButtonHandler(e)}
              >
                Unblock
              </Button>
            ) : (
              <Button
                variant='primary'
                className='half-button'
                onClick={(e) => blockButtonHandler(e)}
              >
                Block
              </Button>
            )}
          </Col>
          <Col md={3}>
            <h2>User Posts</h2>
          </Col>
          <Col md={3}>
            <h2>User Trips</h2>
          </Col>
        </Row>
      )}
      {userBlockedYou && <h1>User Blocked You</h1>}
    </>
  )
}

export default OtherProfileScreen
