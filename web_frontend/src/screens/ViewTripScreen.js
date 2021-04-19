import '../index.css'
import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Container, Card } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Post from '../components/Post'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getMyPosts, deleteMyPost } from '../actions/postsActions'
import axios from 'axios'
import { path } from '../constants/pathConstant'
const ViewTripScreen = ({ location, history, useParams }) => {
  const dispatch = useDispatch()
  //user info contains information about the user

  const [tripInfo, setTripInfo] = useState({})
  const { userInfo } = useSelector((state) => state.userLogin)
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [usernameRemove, setUsernameRemove] = useState('')
  const [otherUserInfo, setOtherUserInfo] = useState('')

  const { pathname } = useLocation()
  const id = pathname.split('/')[2]
  useEffect(async () => {
    const trip = await axios.get(`${path}/trips/${id}`)
	  console.log(trip)
    setTripInfo(trip.data)
    /*const otherUser = await axios.get(`${path}/users?username=${username}`)
    setOtherUserInfo(otherUser.data[0])*/
  },[])
  const redirect = '/'
  useEffect(() => {
    if (!tripInfo) {
      history.push(redirect)
    }
  }, [history, tripInfo, redirect])

  /*getUserInfo(async () => {
    const otherUser = axios.get(`${path}/users?username=${username}`)
    console.log(otherUser);
    setOtherUserInfo(otherUser.data);
  })*/

  const inviteUser = (async (e) => {
    e.preventDefault()
      const otherUser = await axios.get(`${path}/users?username=${username}`)
      console.log(otherUser);
      
      /*setTimeout(() => {
        console.log("waiting");
      }, 1000)*/
      setOtherUserInfo(otherUser.data);
    if (otherUserInfo) {
      console.log(otherUserInfo);
      //setOtherUserInfo(otherUser.data);
      console.log(otherUserInfo[0]._id)
      console.log(userInfo._id)
      console.log(tripInfo._id)
    axios
      .put(`${path}/users/invite-user/${otherUserInfo[0]._id}`, {
        requesting_user_id: userInfo._id,
		    trip_id: tripInfo._id,
      })
      .then((res) => {
        setMessage('Trip invite is Sent')
        setTimeout(() => {
          setMessage(null)
        }, 1000)
      })
      
      console.log('Sent invite request')
    }
  })

  const removeUser = ( async (e) => {
	  e.preventDefault();
	  const otherUser = await axios.get(`${path}/users?username=${usernameRemove}`)
    
    /*setTimeout(() => {
      console.log("waiting");
    }, 1000)*/
    setOtherUserInfo(otherUser.data);
    if (otherUserInfo) {
      console.log(otherUserInfo);
      //setOtherUserInfo(otherUser.data);
      axios
      .put(`${path}/trips/remove-user/${tripInfo._id}`, {
        requesting_user_id: otherUserInfo[0]._id,
      })
      .then((res) => {
        setMessage('Remove request is Sent')
        setTimeout(() => {
          setMessage(null)
        }, 1000)
      })
    }
  })

  return (
    <>
      {message && <Message variant='success'>{message}</Message>}

      {tripInfo && (
        <Row>
          <Col md={3}>
            <h2>Trip Info</h2>
            <div>Destination: </div>
            <div>Start Date: {tripInfo.startDate}</div>
			<div>End Date: {tripInfo.endDate}</div>
          </Col>
          <Col md={3}>
            <h2>Users</h2>
			<FormContainer>
				<Form onSubmit={inviteUser}>
					<Form.Group controlId='confirmPassword'>
					<Form.Label>Invite User (username)</Form.Label>
        				<Form.Control
          					type='Username'
          					placeholder='Username'
          					value={username}
          					onChange={(e) => setUsername(e.target.value)}
        				></Form.Control>
						<Button variant='primary' onClick={inviteUser}>
              				Submit
            			</Button>
					</Form.Group>
				</Form>
			</FormContainer>
          </Col>
          <Col md={3}>
            <h3>Remove User</h3>
			<FormContainer>
				<Form onSubmit={removeUser}>
					<Form.Group controlId='confirmPassword'>
					<Form.Label>Username</Form.Label>
        				<Form.Control
          					type='Username'
          					placeholder='Username'
          					value={usernameRemove}
          					onChange={(e) => setUsernameRemove(e.target.value)}
        				></Form.Control>
						<Button variant='primary' onClick={removeUser}>
              				Submit
            			</Button>
					</Form.Group>
				</Form>
			</FormContainer>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ViewTripScreen