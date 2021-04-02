import '../index.css'
import React, { useState } from 'react'
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Friend from '../components/Friend'
import axios from 'axios'
import { path } from '../constants/pathConstant'
import { addMessageBoard } from '../actions/profilesActions'
const FriendsScreen = () => {
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.userLogin)
  const { friendsInfo } = useSelector((state) => state.getFriends)
  const [members, setMembers] = useState([userInfo])
  const [show, setShow] = useState(false)

  return (
    <Container>
    <h2>Friends:</h2>
    {friendsInfo.map((el) =>
        <Friend friend={el} key={el.id}/>
    )}
    </Container>
  )
}

export default FriendsScreen
