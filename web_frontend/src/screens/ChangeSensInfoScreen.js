import '../index.css'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { updateUserProfile } from '../actions/userActions'
import { path } from '../constants/pathConstant'
import axios from 'axios'
import { sha3_256 } from 'js-sha3'

const logo = {
  uri:
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  width: 64,
  height: 64,
}
const ChangeSensInfoScreen = ({ location, history }) => {
  const { userInfo } = useSelector((state) => state.userLogin)

  const redirect = '/'

  useEffect(() => {
    if (!userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState(userInfo.email)
  const [success, setSuccess] = useState('')
  const [confirmCurrentPassword, setConfirmCurrentPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const dispatch = useDispatch()
  const submitHandler = async (e) => {
    e.preventDefault()
    if (sha3_256(confirmCurrentPassword) !== userInfo.password) {
      setMessage('Old password is different')
    } else {
      const hashedPassword = sha3_256(password)
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: userInfo.token,
        },
      }
      const { data } = await axios.put(
        `${path}/users/${userInfo._id}`,
        {
          ...userInfo,
          password: hashedPassword,
        },
        config
      )
      console.log(data)
      setSuccess('Password successfully changed')
    }
  }
  const submitEmailHandler = async (e) => {
    e.preventDefault()
    if (sha3_256(confirmCurrentPassword) !== userInfo.password) {
      setMessage('Old password is different')
    } else {
      const newEmail = email
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: userInfo.token,
        },
      }
      const { data } = await axios.put(
        `${path}/users/${userInfo._id}`,
        {
          ...userInfo,
          email: newEmail,
        },
        config
      )
      console.log(data)
      setSuccess('Password successfully changed')
    }
  }
  return (
    <FormContainer>
      <h2>Changing sensitive info</h2>
      <h4>Change password</h4>
      {message && <Message variant='danger'>{message}</Message>}
      {success && <Message variant='success'>{success}</Message>}

      <Form.Group controlId='confirmPassword'>
        <Form.Label>Current Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Current Password'
          value={confirmCurrentPassword}
          onChange={(e) => setConfirmCurrentPassword(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId='confirmPassword'>
        <Form.Label>New Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='New Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Button type='submit' variant='primary' onClick={submitHandler}>
        Update
      </Button>

      <h4>Change Email</h4>
      <Form.Group controlId='email'>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail()}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId='confirmPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword()}
        ></Form.Control>
      </Form.Group>
      <Button type='submit' variant='primary' onClick={submitEmailHandler}>
        Update
      </Button>
      <Row>
        <Col>
          <Link to={'/editprofile'}>Back</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}
export default ChangeSensInfoScreen