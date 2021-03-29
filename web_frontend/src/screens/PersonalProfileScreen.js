import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Container, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../components/Post'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getMyPosts, deleteMyPost } from '../actions/postsActions'

const PersonalProfileScreen = ({ location, history }) => {
  const dispatch = useDispatch()
  //user info contains information about the user
  // const myPosts = useSelector((state) => state.myPosts)
  const { userInfo } = useSelector((state) => state.userLogin)
  const { myPosts } = useSelector((state) => state.getMyPosts)
  const deletePost = useSelector((state) => state.deleteMyPost)
  const updatePost = useSelector((state) => state.updateMyPost)
  const [posts, setPosts] = [myPosts]
  const [toDelete, setToDelete] = useState('')
  const profilePic =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  const redirect = '/'

  useEffect(() => {
    if (!userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

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
            {deletePost.loading && (
              <Message variant='success'>Post Deleted</Message>
            )}
            {updatePost.loading && (
              <Message variant='success'>Post Edited</Message>
            )}
            {posts &&
              posts.map((el) => (
                <Post post={el} key={el._id} personal={true} />
              ))}
          </Col>
          <Col md={3}>
            <h2>My Trips</h2>
          </Col>
        </Row>
      )}
    </>
  )
}

export default PersonalProfileScreen
