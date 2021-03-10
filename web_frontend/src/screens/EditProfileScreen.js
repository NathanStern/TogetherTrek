import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { updateUserProfile } from '../actions/userActions'

const logo = {
	uri:
		'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
	width: 64,
	height: 64,
}
const EditProfileScreen = ({ location, history }) => {
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
	const submitHandler = (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			setMessage('Passwords do not match')
		} else {
			dispatch(
				updateUserProfile(
					username,
					firstName,
					lastName,
					gender,
					birthdate,
					email,
					password
				)
			)
		}
	}

	return (
		<FormContainer>
			<h2>Edit User Profile</h2>
			{message && <Message variant='danger'>{message}</Message>}
			{error && <Message variant='danger'>{error}</Message>}
			{success && <Message variant='success'>Profile Updated</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='name'>
					<Form.Label>Username</Form.Label>
					<Form.Control
						type='name'
						placeholder='Enter username'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='email'>
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='name'>
					<Form.Label>Enter First Name</Form.Label>
					<Form.Control
						type='name'
						placeholder='Enter First Name'
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='name'>
					<Form.Label>Enter Last Name</Form.Label>
					<Form.Control
						type='name'
						placeholder='Enter Last Name'
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='exampleForm.ControlSelect1'>
					<Form.Label>Select Gender</Form.Label>
					<Form.Control
						as='select'
						onChange={(e) => setGender(e.target.value)}
						value={gender}
					>
						<option>Female</option>
						<option>Male</option>
					</Form.Control>
				</Form.Group>

				<Form.Group controlId='date'>
					<Form.Label>Enter Birth Date</Form.Label>
					<Form.Control
						type='date'
						placeholder='Enter Last Name'
						value={birthdate}
						onChange={(e) => setBirthdate(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='confirmPassword'>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Confirm password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Button type='submit' variant='primary'>
					Update
				</Button>
				<Row>
					<Col>
						<Link to={'/profile'}>Back To Profile</Link>
					</Col>
				</Row>
			</Form>
		</FormContainer>
	)
}

export default EditProfileScreen
