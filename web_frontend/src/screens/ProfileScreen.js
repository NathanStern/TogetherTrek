import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
const logo = {
	uri:
		'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
	width: 64,
	height: 64,
}
const ProfileScreen = ({ location, history }) => {
	const dispatch = useDispatch()

	//user info contains information about the user
	const { userInfo } = useSelector((state) => state.userLogin)
	console.log(userInfo)

	const redirect = '/'

	useEffect(() => {
		if (!userInfo) {
			history.push(redirect)
		}
	}, [history, userInfo, redirect])

	return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>
				{userInfo ? (
					<>
						<div>Username: {userInfo.username}</div>
						<div>First Name: {userInfo.first_name}</div>
						<div>Last Name: {userInfo.last_name}</div>
						<div>Birthday: {userInfo.birthdate}</div>
						<div>Gender: {userInfo.gender}</div>
					</>
				) : (
					<div></div>
				)}
			</Col>
			<Col md={3}>
				<h2>My Trips</h2>
			</Col>
		</Row>
	)
}

export default ProfileScreen
