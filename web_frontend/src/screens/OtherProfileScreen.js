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
import { getFriend } from '../actions/userActions'
import { path } from '../constants/pathConstant'

const OtherProfileScreen = ({ location, history, useParams }) => {
  const dispatch = useDispatch()

  const [profileInfo, setProfileInfo] = useState({})
  const [friend, setFriend] = useState(false)
  const [requested, setRequested] = useState(false)
  const [friendBtnText, setFriendBtnText] = useState("Add")
  const [profilePic, setProfilePic] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")

  // Get the id of the user who's profile is being viewed and get the active user
  const { pathname } = useLocation()
  const id = pathname.split('/')[2]

  // Get the profile data of the other user's profile and set local values
  const { userInfo } = useSelector((state) => state.userLogin)
  axios.get(`${path}/users/${id}`).then(resp => {
    const user = resp.data
    const isFriend = user.friend_ids.includes(userInfo._id)
    const hasRequested = user.friend_requests.includes(userInfo._id)
    setFriend(isFriend ? true : false)
    setRequested(hasRequested ? true : false)
    setFriendBtnText(isFriend ? "Remove" : hasRequested ? "Requested" : "Add")
    if (user.profile_pic) {
      setProfilePic(user.profile_pic)
    }
    setProfileInfo(user)
  })

  // Ensure user was retrieved
  const redirect = '/'
  useEffect(() => {
    if (!profileInfo) {
      history.push(redirect)
    }
  }, [history, profileInfo, redirect])

  const friendButtonHandler = (e) => {
    if (friend) {
      console.log("Not yet implemented")
    } else if (!requested) {
      dispatch(requestFriend(profileInfo._id))
      setFriendBtnText("Requested")
    }
  }

  const messageButtonHandler = (e) => {
    console.log("Not yet implemented")
  }

  return (
    <>
      {profileInfo && (
        <Row>
          <Col md={3}>
            <h2>User Profile</h2>
            <img src={profilePic} alt='profile pic' width='100' height='100' />
            <div>Username: {profileInfo.username}</div>
            <div>First Name: {profileInfo.first_name}</div>
            <div>Last Name: {profileInfo.last_name}</div>
            <div>Birthday: {profileInfo.birthdate}</div>
            <div>Gender: {profileInfo.gender}</div>
            <div>City: {profileInfo.city}</div>
            <div>Country: {profileInfo.country}</div>
            <Button
              variant='primary'
              className="half-button"
              onClick={(e) => friendButtonHandler(e)}>
              {friendBtnText}
            </Button>
            <Button
              variant='primary'
              className="half-button"
              onClick={(e) => friendButtonHandler(e)}>
              Message
            </Button>
          </Col>
          <Col md={3}>
            <h2>User Posts</h2>
          </Col>
          <Col md={3}>
            <h2>User Trips</h2>
          </Col>
        </Row>
      )}
    </>
  )
}

export default OtherProfileScreen
