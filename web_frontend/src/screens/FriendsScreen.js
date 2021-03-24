import React, { useState } from 'react'
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Friend from '../components/Friend'
import axios from 'axios'
import { path } from '../constants/pathConstant'
const FriendsScreen = () => {
	const { userInfo } = useSelector((state) => state.userLogin)
	const { friendsInfo } = useSelector((state) => state.getFriends)
	const [members, setMembers] = useState([])
	const [show, setShow] = useState(false)
	console.log(friendsInfo)
	const editHandler = (e) => {
		e.preventDefault()
		setShow(!show)
	}

	const createMessageBoard = async (e) => {
		e.preventDefault()
		let user_ids = []
		members.forEach((e) => {
			user_ids.push(e._id)
		})
		console.log(user_ids)
		const { data } = await axios.post(`${path}/message_boards`)
		console.log(data)
	}

	return (
		<Container>
			<Row>
				<Col md={3}>
					<h2>
						Friends: <Button onClick={editHandler}>Create MessageBoard</Button>
					</h2>
					{friendsInfo.map((el) => (
						<Friend
							friend={el}
							key={el.id}
							show={show}
							members={members}
							setMembers={setMembers}
						/>
					))}
				</Col>
				{show && (
					<>
						<Col>
							<h2>Create MessageBoard</h2>
							<Row>
								<Col>
									<Card style={{ width: '18rem' }}>
										<Card.Header>Members</Card.Header>
										<ListGroup variant='flush'>
											{members.length > 0 &&
												members.map((el) => (
													<ListGroup.Item key={el.username}>
														{el.username}
													</ListGroup.Item>
												))}
										</ListGroup>
									</Card>
								</Col>
								<Col>
									<Button variant='primary' onClick={createMessageBoard}>
										Submit
									</Button>
								</Col>
							</Row>
						</Col>
					</>
				)}
			</Row>
		</Container>
	)
}

export default FriendsScreen
