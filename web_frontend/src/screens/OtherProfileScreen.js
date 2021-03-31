import '../index.css'
import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Container, Card } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../components/Post'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getMyPosts, deleteMyPost } from '../actions/postsActions'
import axios from 'axios'
import { path } from '../constants/pathConstant'
const OtherProfileScreen = ({ location, history, useParams }) => {
  const dispatch = useDispatch()
  //user info contains information about the user

  const [profileInfo, setProfileInfo] = useState({})
  const { userInfo } = useSelector((state) => state.userLogin)
  const [message, setMessage] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const { pathname } = useLocation()
  const id = pathname.split('/')[2]
  useEffect(async () => {
    const profile = await axios.get(`${path}/users/${id}`)
    setProfileInfo(profile.data)
  })

  const profilePic =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  const redirect = '/'
  useEffect(() => {
    if (!profileInfo) {
      history.push(redirect)
    }
  }, [history, profileInfo, redirect])

  const addFriend = (e) => {
    e.preventDefault()
    axios
      .put(`${path}/users/request-friend/${profileInfo._id}`, {
        requesting_user_id: userInfo._id,
      })
      .then((res) => {
        setMessage('Friend Request is Sent')
        setTimeout(() => {
          setMessage(null)
        }, 1000)
      })
    setDisabled(true)
    console.log('Sent friend request')
  }

  return (
    <>
      {message && <Message variant='success'>{message}</Message>}

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
            {!disabled ? (
              <Button variant='primary' onClick={addFriend}>
                Add Friend
              </Button>
            ) : (
              <Button variant='primary' disabled>
                Requested
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
    </>
  )
}

export default OtherProfileScreen
