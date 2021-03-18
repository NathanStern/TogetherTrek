import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Friend from '../components/Friend'
const FriendsScreen = () => {
	const { userInfo } = useSelector((state) => state.userLogin)
	const { friendsInfo } = useSelector((state) => state.getFriends)
	console.log(friendsInfo)
	return (
		<Col md={3}>
			{friendsInfo.map((el) => (
				<Friend friend={el} key={el.id} />
			))}
		</Col>
	)
}

export default FriendsScreen
