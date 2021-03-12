import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getMyPosts, getPosts } from '../actions/postsActions'
import { login } from '../actions/userActions'
import Post from '../components/Post'
const PostsScreen = () => {
	const dispatch = useDispatch()
	const { allPosts } = useSelector((state) => state.getAllPosts)
	console.log(allPosts)
	return (
		<Container>
			{allPosts && allPosts.map((el) => <Post post={el} key={el._id} />)}
		</Container>
	)
}

export default PostsScreen
