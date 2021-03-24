import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserFriends, login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getMyPosts, getPosts } from '../actions/postsActions'
import { sha3_256 } from 'js-sha3'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { path } from '../constants/pathConstant'
const LoginScreen = ({ history, location }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const dispatch = useDispatch()

	const userLogin = useSelector((state) => state.userLogin)
	const { loading, error, userInfo } = userLogin

	const redirect = location.search ? location.search.split('=')[1] : '/'

	useEffect(() => {
		if (userInfo) {
			history.push(redirect)
		}
	}, [history, userInfo, redirect])

	const submitHandler = async (e) => {
		e.preventDefault()
		const hashedPassword = sha3_256(password)
		console.log(`hashed password in login is ${hashedPassword}`)
		const { data } = await axios.post(`${path}/users/login`, {
			username: email,
			password: hashedPassword,
		})
		const decoded = jwt_decode(data.token)
		console.log(decoded)
		dispatch(login(decoded, data.token)).then((e) => {
			dispatch(getMyPosts())
			dispatch(getPosts())
			dispatch(getUserFriends())
		})
	}

	return (
		<FormContainer>
			<h1>Sign In</h1>
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='email'>
					<Form.Label>Username</Form.Label>
					<Form.Control
						type='username'
						placeholder='Enter Username'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
			</Form>

			<Button type='submit' variant='primary' onClick={submitHandler}>
				Sign In
			</Button>
			<Row className='py-3'>
				<Col>
					New Customer?{' '}
					<Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
						Register
					</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default LoginScreen
