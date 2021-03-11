import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Container, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../components/Post'
import Message from '../components/Message'
import Loader from '../components/Loader'
import axios from 'axios'

const ProfileScreen = ({ location, history }) => {
	const dispatch = useDispatch()
	const [myPosts, setMyPosts] = useState([])
	//user info contains information about the user
	const { userInfo } = useSelector((state) => state.userLogin)
	console.log(userInfo)
	const profilePic =
		'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
	const redirect = '/'

	useEffect(async () => {
		try {
			const allPosts = await axios.get('http://localhost:3001/posts/')

			console.log(allPosts.data)
			const usersPosts = allPosts.data.filter(
				(el) => parseInt(el.author_id) === userInfo._id
			)
			setMyPosts(usersPosts)
			console.log(myPosts)
		} catch {}
	}, [])

	useEffect(() => {
		if (!userInfo) {
			history.push(redirect)
		}
	}, [history, userInfo, redirect])

	return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>
				<img src={profilePic} alt='profile pic' width='100' height='100' />
				<div>Username: {userInfo.username}</div>
				<div>First Name: {userInfo.first_name}</div>
				<div>Last Name: {userInfo.last_name}</div>
				<div>Birthday: {userInfo.birthdate}</div>
				<div>Gender: {userInfo.gender}</div>
				<Link to={'/editprofile'}>Edit Profile</Link>
			</Col>
			<Col md={3}>
				<h2>My Posts</h2>
				<Post
					post={{
						_id: '3',
						author_id: '1',
						title: 'Title',
						description: 'im going on vacation',
						post_date: '1990-01-01T00:00:00.000+00:00',
						destinations: [
							{
								_id: '60495093a7908e0c2001fc9e',
								country: 'USA',
								city: 'Indy',
								region: 'Indiana',
							},
						],
						__v: 0,
					}}
				/>
			</Col>
			<Col md={3}>
				<h2>My Trips</h2>
			</Col>
		</Row>
	)
}

export default ProfileScreen
