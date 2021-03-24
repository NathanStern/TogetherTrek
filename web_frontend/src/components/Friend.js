import React from 'react'
import { Card, Col, Container, Row, Button } from 'react-bootstrap'

const Friend = ({ friend }) => {
	const profilePic =
		'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'

	const deleteFriendHandler = (e) => {
		e.preventDefault()
	}
	return (
		<Card>
			<Card.Img src={profilePic} />
			<Card.Body>
				<Card.Title>{friend.username}</Card.Title>
				<Card.Text>
					{friend.first_name} {friend.last_name}
				</Card.Text>
				<Card.Text>{friend.gender}</Card.Text>
				<Card.Text>{friend.birthdate}</Card.Text>
				<Card.Text>{friend.email}</Card.Text>
				<Row>
					<Col>
						<Button variant='primary'>Message</Button>
					</Col>
					<Col>
						<Button variant='primary'>Remove</Button>
					</Col>
				</Row>
			</Card.Body>
		</Card>
	)
}

export default Friend
