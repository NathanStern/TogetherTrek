import React, { useEffect, useState } from 'react'
import {
	Card,
	ListGroup,
	Button,
	Container,
	Row,
	Col,
	Form,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMyPost, updateMyPost } from '../actions/postsActions'
import { Link } from 'react-router-dom'

const Post = ({ post, personal }) => {
	// console.log(post)
	const dispatch = useDispatch()
	const [show, setShow] = useState(true)
	const [edit, setEdit] = useState(false)

	const [title, setTitle] = useState(post.title)
	const [description, setDescription] = useState(post.description)

	const deleteHandler = (e) => {
		e.preventDefault()
		setShow(!show)
		dispatch(deleteMyPost(post))
	}

	const updateHandler = (e) => {
		e.preventDefault()
		dispatch(
			updateMyPost({
				...post,
				title: title,
				description: description,
			})
		)
		setEdit(!edit)
		setShow(!show)
	}
	const editHandler = async (e) => {
		e.preventDefault()
		setEdit(!edit)
		setShow(!show)
	}
	useEffect(() => {}, [deleteHandler])
	return (
		<>
			{show && (
				<Card style={{ width: '18rem' }}>
					<Card.Body>
						<Card.Title>{title}</Card.Title>
						<Card.Subtitle className='mb-2 text-muted'>
							<ListGroup>
								{post.destinations.map((dest) => (
									<ListGroup.Item key={dest._id}>
										{dest.country} ->{dest.city} -> {dest.region}{' '}
									</ListGroup.Item>
								))}
							</ListGroup>
						</Card.Subtitle>
						<Card.Text>{description}</Card.Text>
						<Card.Text>{post.post_date}</Card.Text>

						{personal === true && (
							<Container>
								<Row>
									<Col>
										<Button
											variant='primary'
											onClick={(e) => {
												deleteHandler(e)
											}}
										>
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
						)}
						{personal === false && (
							<Container>
								<Row>
									<Col>
										<Link to={`/profile/${post.author_id}`}>
											Author's Profile
										</Link>
									</Col>
								</Row>
							</Container>
						)}
					</Card.Body>
				</Card>
			)}
			{edit && (
				<Form onSubmit={updateHandler}>
					<Form.Group controlId='text'>
						<Form.Label>Title</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter Title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId='exampleForm.ControlTextarea1'>
						<Form.Label>Description</Form.Label>
						<Form.Control
							as='textarea'
							rows={10}
							placeholder='Enter Description'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Container>
						<Row>
							<Col>
								<Button
									variant='primary'
									onClick={(e) => {
										updateHandler(e)
									}}
								>
									Update
								</Button>
							</Col>
							<Col>
								<Button variant='primary' onClick={editHandler}>
									Back
								</Button>
							</Col>
						</Row>
					</Container>
				</Form>
			)}
		</>
	)
}

export default Post
