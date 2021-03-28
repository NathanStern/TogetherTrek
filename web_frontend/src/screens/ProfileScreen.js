import '../index.css';
import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Container, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../components/Post'
import Trip from '../components/Trip'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getMyPosts, deleteMyPost } from '../actions/postsActions'
import { getMyTrips, leaveTrip } from '../actions/tripsActions'
import { path } from '../constants/pathConstant'

const ProfileScreen = ({ location, history }) => {
	const dispatch = useDispatch()
	//user info contains information about the user
	// const myPosts = useSelector((state) => state.myPosts)
	const { userInfo } = useSelector((state) => state.userLogin)
	const { myPosts } = useSelector((state) => state.getMyPosts)
	const { myTrips } = useSelector((state) => state.getMyTrips)
	const deletePost = useSelector((state) => state.deleteMyPost)
	const updatePost = useSelector((state) => state.updateMyPost)
	const leaveTrip = useSelector((state) => state.leaveTrip)
	const [posts, setPosts] = [myPosts]
	const [trips, setTrips] = [myTrips]
	const [toDelete, setToDelete] = useState('')
	const personal = true
	const redirect = '/'
	let profilePic

	useEffect(() => {
		if (!userInfo) {
			history.push(redirect)
		}
	}, [history, userInfo, redirect])

	if (userInfo) {
		if (userInfo.profile_pic) {
			profilePic = path + `/users/profile-pic/${userInfo._id}`
		} else {
			profilePic = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
		}
	}

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
						<Link to={'/editprofile'}>Edit Profile</Link>
					</Col>
					<Col md={3}>
						<h2>My Posts</h2>
						{deletePost.loading && (
							<Message variant='success'>Post Deleted</Message>
						)}
						{updatePost.loading && (
							<Message variant='success'>Post Edited</Message>
						)}
						{posts &&
							posts.map((el) => (
								<Post post={el} key={el._id} personal={personal} />
							))}
					</Col>
					<Col md={3}>
						<h2>My Trips</h2>
						{leaveTrip.loading && (
							<Message variant='success'>Trip Left</Message>
						)}
						{trips &&
							trips.map((el) => (
								<Trip trip={el} key={el._id} personal={personal} />
							))}
					</Col>
				</Row>
			)}
		</>
	)
}

export default ProfileScreen
