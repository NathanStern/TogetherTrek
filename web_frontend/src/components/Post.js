import React from 'react'
import { Card } from 'react-bootstrap'
const Post = ({ post }) => {
	console.log('Post is ')
	console.log(post)
	return (
		<Card style={{ width: '18rem' }}>
			<Card.Body>
				<Card.Title>{post.title}</Card.Title>
				<Card.Subtitle className='mb-2 text-muted'></Card.Subtitle>
				<Card.Text>{post.description}</Card.Text>
				<Card.Text>
					{post.destinations[0].country}, {post.destinations[0].city},{' '}
					{post.destinations[0].region}
				</Card.Text>
				{/* <Card.Link href='#'>Card Link</Card.Link> */}
				{/* <Card.Link href='#'>Another Link</Card.Link> */}
				<Card.Text>{post.post_date}</Card.Text>
			</Card.Body>
		</Card>
	)
}

export default Post
