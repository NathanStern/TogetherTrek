import React, { useEffect } from 'react'
import { Card, ListGroup, Button, Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'

const Post = ({ post }) => {
	const deleteHandler = async (e) => {
		e.preventDefault()
		try {
			const { data } = await axios.delete(
				`http://localhost:3001/posts/${post._id}`
			)
		} catch {}
	}
	useEffect(() => {}, [deleteHandler])
	//needs to be implemented
	const editHandler = (e) => {
		e.preventDefault()
	}
	return (
		<Card style={{ width: '18rem' }}>
			<Card.Body>
				<Card.Title>{post.title}</Card.Title>
				<Card.Subtitle className='mb-2 text-muted'>
					<ListGroup>
						{post.destinations.map((dest) => (
							<ListGroup.Item key={dest._id}>
								{dest.country} ->{dest.city} -> {dest.region}{' '}
							</ListGroup.Item>
						))}
					</ListGroup>
				</Card.Subtitle>
				<Card.Text>{post.description}</Card.Text>

				{/* <Card.Link href='#'>Card Link</Card.Link> */}
				{/* <Card.Link href='#'>Another Link</Card.Link> */}
				<Card.Text>{post.post_date}</Card.Text>

				<Container>
					<Row>
						<Col>
							<Button variant='primary' onClick={deleteHandler}>
								Delete
							</Button>
						</Col>
						<Col>
							<Button variant='primary' onClick={editHandler}>
								Edit
							</Button>
						</Col>
					</Row>
				</Container>
			</Card.Body>
		</Card>
	)
}

export default Post
