import '../index.css';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Router, Link } from 'react-router-dom'
import { component } from 'react'
import { Row, Col } from 'react-bootstrap'
import { path } from '../constants/pathConstant'

const MakePostScreen = ({ history, location }) => {
	const { userInfo } = useSelector((state) => state.userLogin)
	const redirect = '/'
	const [author_id, setUserId] = useState('')
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [country, setCountry] = useState('')
	const [city, setCity] = useState('')
	const [region, setRegion] = useState('')
	const [responseToPost, setResponse1] = useState('')

	useEffect(() => {
		if (!userInfo) {
			history.push(redirect)
		}
	}, [history, userInfo, redirect])

	const handleSubmit = (event) => {
		event.preventDefault()
		console.log(
			`Title is ${title}, description: ${description}, destinations: ${country}`
		)
		setUserId(userInfo._id)
		callAPI(title, description, country, city, region, author_id)
		history.push('/posts')
	}

	const callAPI = (title, description, country, city, region, author_id) => {
		console.log(author_id)
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				title: title,
				author_id: author_id,
				description: description,
				post_date: Date.now(),
				destinations: [
					{
						country: country,
						city: city,
						region: region,
					},
				],
			}),
		}
		fetch(`${path}/posts`, requestOptions)
			.then((response) => response.json())
			.then((res) => setResponse1(JSON.stringify(res)))
		console.log('response1 ' + responseToPost)
	}

	return (
		<div>
			<h3 className='col-lg-4'> New Post</h3>
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label> Title: </label>
					<input
						type='text'
						value={title}
						onChange={(event) => setTitle(event.target.value)}
					/>
				</div>

				<div className='form-group'>
					<label> Description:</label>
					<input
						type='text'
						value={description}
						onChange={(event) => setDescription(event.target.value)}
					/>
				</div>
				<div className='form-group'>
					<label> Country:</label>
					<input
						type='text'
						value={country}
						onChange={(event) => setCountry(event.target.value)}
					/>
				</div>
				<div className='form-group'>
					<label> City:</label>
					<input
						type='text'
						value={city}
						onChange={(event) => setCity(event.target.value)}
					/>
				</div>
				<div className='form-group'>
					<label> Region:</label>
					<input
						type='text'
						value={region}
						onChange={(event) => setRegion(event.target.value)}
					/>
				</div>
				<button>Post</button>
			</form>
		</div>
	)
}

export default MakePostScreen
