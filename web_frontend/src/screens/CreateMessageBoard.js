import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import axios from 'axios'
import { useSelector } from 'react-redux'
const CreateMessageBoard = () => {
	const { userInfo } = useSelector((state) => state.userLogin)
	const { friendsInfo } = useSelector((state) => state.getFriends)
	return (
		<Container>
			<Form size='sm'>
				<Form.Group controlId='formBasicEmail'>
					<Form.Label>Email address</Form.Label>
					<Form.Control type='email' placeholder='Enter email' />
					<Form.Text className='text-muted'>
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>

				<Form.Group controlId='formBasicPassword'>
					<Form.Label>Password</Form.Label>
					<Form.Control type='password' placeholder='Password' />
				</Form.Group>
				<Form.Group controlId='formBasicCheckbox'>
					<Form.Check type='checkbox' label='Check me out' />
				</Form.Group>
				<Button variant='primary' type='submit'>
					Submit
				</Button>
			</Form>
		</Container>
	)
}

export default CreateMessageBoard
