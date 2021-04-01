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

  const { pathname } = useLocation()
  const id = pathname.split('/')[2]
  useEffect(async () => {
    const trip = await axios.get(`${path}/trips/${id}`)
    setTripInfo(trip.data)
  })
  const redirect = '/'
  useEffect(() => {
    if (!tripInfo) {
      history.push(redirect)
    }
  }, [history, tripInfo, redirect])

  const inviteUser = (e) => {
    e.preventDefault()
    /*axios
      .put(`${path}/users/request-friend/${tripInfo._id}`, {
        requesting_user_id: userInfo._id,
      })
      .then((res) => {
        setMessage('Trip invite is Sent')
        setTimeout(() => {
          setMessage(null)
        }, 1000)
      })
	  */
    console.log('Sent invite request')
  }

  return (
    <>
      {message && <Message variant='success'>{message}</Message>}

      {tripInfo && (
        <Row>
          <Col md={3}>
            <h2>Trip Info</h2>
            <div>Destination: {tripInfo.destination}</div>
            <div>Start Date: {tripInfo.startDate}</div>
          </Col>
          <Col md={3}>
            <h2>Users</h2>
			<FormContainer>
				<Form onSubmit={inviteUser}>
					<Form.Group controlId='confirmPassword'>
					<Form.Label>Add User (username)</Form.Label>
        				<Form.Control
          					type='Username'
          					placeholder='Username'
          					value={1}
          					onChange={(e) => setMessage(e.target.value)}
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
				<Form onSubmit={inviteUser}>
					<Form.Group controlId='confirmPassword'>
					<Form.Label>Username</Form.Label>
        				<Form.Control
          					type='Username'
          					placeholder='Username'
          					value={1}
          					onChange={(e) => setMessage(e.target.value)}
        				></Form.Control>
						<Button variant='primary' onClick={inviteUser}>
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