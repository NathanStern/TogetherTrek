import '../index.css';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { updateUserProfile } from '../actions/userActions'
import {path} from '../constants/pathConstant'
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
    const [username, setUsername] = useState(userInfo.username)
    const [firstName, setFirstName] = useState(userInfo.first_name)
    const [lastName, setLastName] = useState(userInfo.last_name)
    const [email, setEmail] = useState(userInfo.email)
    const [password, setPassword] = useState(userInfo.password)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [gender, setGender] = useState(userInfo.gender)
    const [birthdate, setBirthdate] = useState(userInfo.birthdate)
    const dispatch = useDispatch()
  
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { loading, success, error } = userUpdateProfile
    const submitHandler = async (e) => {
      e.preventDefault()
      const hashedPassword = sha3_256(password)
      const { data } = await axios.put(`${path}/user/${userInfo._id}`, {...userInfo, password: hashedPassword,})
    }
    return (
    <FormContainer>
        <h2>Changing sensitive info</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading && <Loader />}
        <h4>Change password</h4>
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Current Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
        <Button type='submit' variant='primary'>
          Update
        </Button>

        <h4>Change Email</h4>
        <Form.Group controlId='confirmPassword'>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='New Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(sha3_256(e.target.value))}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Update
        </Button>
        <Row>
          <Col>
            <Link to={'/editprofile'}>Back</Link>
          </Col>
        </Row>
    </FormContainer>
    );
}
export default ChangeSensInfoScreen