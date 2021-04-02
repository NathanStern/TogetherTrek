import '../index.css'
import React, { useEffect, useState } from 'react'
import { CardColumns, CardDeck, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getMyPosts, getPosts } from '../actions/postsActions'
import { login } from '../actions/userActions'
import Post from '../components/Post'
const PostsScreen = ({ history }) => {
  const redirect = '/'
  const { userInfo } = useSelector((state) => state.userLogin)

  useEffect(() => {
    if (!userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])
  const dispatch = useDispatch()
  const { allPosts } = useSelector((state) => state.getAllPosts)
  console.log(allPosts)
  return (
    <>
      <h1>Posts</h1>
      {allPosts && (
        <CardColumns>
          {allPosts &&
            allPosts
              .reverse()
              .map((el) => <Post post={el} key={el._id} personal={false} />)}
        </CardColumns>
      )}
    </>
  )
}

export default PostsScreen
