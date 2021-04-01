import '../index.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, Button, Row, Col, Container, Card } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Post from '../components/Post'
import Trip from '../components/Trip'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getMyPosts, deleteMyPost } from '../actions/postsActions'
import { getUserFriends } from '../actions/userActions'
import { getMyTrips } from '../actions/tripsActions'
import { path } from '../constants/pathConstant'

import ReactDOM from 'react-dom';

const ProfileScreen = ({ location, history }) => {
  const { userInfo } = useSelector((state) => state.userLogin)
  const { myPosts } = useSelector((state) => state.getMyPosts)
  const { myTrips } = useSelector((state) => state.getMyTrips)

  const redirect = '/'
  useEffect(() => {
    if (!userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  let profilePic
  if (userInfo.profile_pic) {
    profilePic = path + `/users/profile-pic/${userInfo._id}`
  } else {
    profilePic =
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  }

  return (
    <>
      {userInfo && (
        <Row>
          <Col md={3}>
            <h2>User Profile</h2>
            <img src={profilePic} alt='profile pic' width='100' height='100' />
            <div>Username: {userInfo.username}</div>
            <div>First Name: {userInfo.first_name}</div>
            <div>Last Name: {userInfo.last_name}</div>
            <div>Birthday: {userInfo.birthdate}</div>
            <div>Gender: {userInfo.gender}</div>
            <Link to={'/editprofile'}>Edit Profile</Link>
          </Col>
          <Col md={3}>
            <h2>My Posts</h2>
            {myPosts &&
              myPosts.map((el) =>
                (el === undefined ? <></> :
                    <Post post={el} key={el._id} personal={true} />
                )
              )
            }
          </Col>
          <Col md={3}>
            <h2>My Trips</h2>
            <Container>
              {myTrips &&
                myTrips.map((el) =>
                  (el === undefined ? <></> :
    									<Trip trip={el} userId={userInfo._id} profileView={true} key={el._id}/>
    							)
                )
              }
            </Container>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProfileScreen
