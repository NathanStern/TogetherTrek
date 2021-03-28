import '../index.css';
import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import Message from '../components/Message'
import { path } from '../constants/pathConstant'
import { useSelector } from 'react-redux'
const CreatePostScreen = ({ history }) => {
	const { userInfo } = useSelector((state) => state.userLogin)

	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [country, setCountry] = useState('')
	const [city, setCity] = useState('')
	const [region, setRegion] = useState('')
	const [message, setMessage] = useState('')
	const postHandler = async (e) => {
		e.preventDefault()
		try {
			const res = await axios.post(`${path}/posts`, {
				title: title,
				author_id: userInfo._id,
				description: description,
				post_date: Date.now(),
				destinations: [
					{
						country: country,
						city: city,
						region: region,
					},
				],
			})

			await axios.put(`${path}/users/${userInfo._id}`, {
				...userInfo,
				post_ids: userInfo.post_ids.concat(res.data),
			})
			setMessage('Post Added')
			history.push('/')
		} catch {}
	}

	return (
		<>
			{message && <Message variant='success'>{message}</Message>}
			<Form>
				<Form.Group controlId='text'>
					<Form.Label>Title</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter Title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='exampleForm.ControlTextarea1'>
					<Form.Label>Description</Form.Label>
					<Form.Control
						as='textarea'
						rows={10}
						placeholder='Enter Description'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='text'>
					<Form.Label>Country</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter Country'
						value={country}
						onChange={(e) => setCountry(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='text'>
					<Form.Label>City</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter City'
						value={city}
						onChange={(e) => setCity(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='text'>
					<Form.Label>Region</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter Region'
						value={region}
						onChange={(e) => setRegion(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Button
					variant='primary'
					onClick={(e) => {
						postHandler(e)
					}}
				>
					Post
				</Button>
			</Form>
		</>
	)
}

export default CreatePostScreen
