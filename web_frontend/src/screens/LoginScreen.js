<<<<<<< HEAD
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        console.log(`Email is ${email} and password is ${password}`)
    }
    return (
        <div>
            <h3 className='col-lg-4'> Sign In</h3>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label> Email:  </label>
                    <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className='form-group'>
                    <label> Password:</label>
                    <input type="text" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                <button >Submit</button>
            </form>
        </div>
    )
=======
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
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

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(login(email, password))
	}

	return (
		<FormContainer>
			<h1>Sign In</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='email'>
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter Email'
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
		</FormContainer>
	)
>>>>>>> state_management
}

export default LoginScreen
