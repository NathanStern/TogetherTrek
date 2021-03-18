import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Container, Card } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../components/Post'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getMyPosts, deleteMyPost } from '../actions/postsActions'
import axios from 'axios'
import { path } from '../constants/pathConstant'

const PersonalProfileScreen = ({ location, history, useParams }) => {
	const dispatch = useDispatch()
	//user info contains information about the user
	const [userInfo, setUserInfo] = useState({})
	const { pathname } = useLocation()
	const id = pathname.split('/')[2]
	console.log(id)
	useEffect(async () => {
		const profile = await axios.get(`${path}/users/${id}`)
		setUserInfo(profile.data)
	})

	const profilePic =
		'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
	const redirect = '/'
	useEffect(() => {
		if (!userInfo) {
			history.push(redirect)
		}
	}, [history, userInfo, redirect])

	return (
		<>
			{userInfo && (
				<Row>
					<Col md={3}>
						<h2>User Profile</h2>
						<img src={profilePic} alt='profile pic' width='100' height='100' />
						<div>Username: {userInfo.username}</div>
						<div>First Name: {userInfo.first_name}</div>
						<div>Last Name: {userInfo.last_name}</div>
						<div>Birthday: {userInfo.birthdate}</div>
						<div>Gender: {userInfo.gender}</div>
					</Col>
					<Col md={3}>
						<h2>User Posts</h2>
					</Col>
					<Col md={3}>
						<h2>User Trips</h2>
					</Col>
				</Row>
			)}
		</>
	)
}

export default PersonalProfileScreen
