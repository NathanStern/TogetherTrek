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
import S3 from 'react-aws-s3'
import ReactDOM from 'react-dom'

const ProfileScreen = ({ location, history }) => {
  const { userInfo } = useSelector((state) => state.userLogin)
  const { myPosts } = useSelector((state) => state.getMyPosts)
  const { myTrips } = useSelector((state) => state.getMyTrips)
  const [newProfilePic, setNewProfilePic] = useState()
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(true)
  const redirect = '/'
  useEffect(() => {
    if (!userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  let profilePic =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  if (userInfo.profile_pic) {
    profilePic = path + `/users/profile-pic/${userInfo._id}`
  }

  const uploadPicHandler = (e) => {
    e.preventDefault()
    console.log(newProfilePic)
    let form_data = new FormData()
    form_data.append('file', newProfilePic)
    console.log(form_data)
    setLoading(true)
    axios
      .put(`${path}/users/profile-pic/${userInfo._id}`, form_data, {
        headers: {
          'Content-Type': undefined,
        },
      })
      .then((e) => {
        console.log(e)
        setLoading(false)
      })
      .catch((e) => console.log(e.response))
  }

  return (
    <>
      {userInfo && (
        <Row>
          <Col md={3}>
            {loading && <Loader />}
            <h2>User Profile</h2>
            <img src={profilePic} alt='profile pic' width='100' height='100' />
            {!show && (
              <Form>
                <Form.Group>
                  <Form.File
                    accept='image/png, image/jpeg'
                    id='exampleFormControlFile1'
                    label='Change User Profile Picture'
                    // value={newProfilePic}
                    onChange={(e) => {
                      setNewProfilePic(e.target.files[0])
                      // console.log(e.target.files[0])
                    }}
                  />
                </Form.Group>
                <Button onClick={uploadPicHandler}>Submit</Button>
              </Form>
            )}
            <div>Username: {userInfo.username}</div>
            <div>First Name: {userInfo.first_name}</div>
            <div>Last Name: {userInfo.last_name}</div>
            <div>Birthday: {userInfo.birthdate}</div>
            <div>Gender: {userInfo.gender}</div>
            <div>
              <Button onClick={(e) => setShow(!show)}>
                Edit Profile Picture
              </Button>
            </div>
            <Link to={'/editprofile'}>Edit Profile</Link>
          </Col>
          <Col md={3}>
            <h2>My Posts</h2>
            {myPosts &&
              myPosts.map((el) =>
                el === undefined ? (
                  <></>
                ) : (
                  <Post post={el} key={el._id} personal={true} />
                )
              )}
          </Col>
          <Col md={3}>
            <h2>My Trips</h2>
            <Container>
              {myTrips &&
                myTrips.map((el) =>
                  el === undefined ? (
                    <></>
                  ) : (
                    <Trip
                      trip={el}
                      userId={userInfo._id}
                      profileView={true}
                      key={el._id}
                    />
                  )
                )}
            </Container>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProfileScreen
