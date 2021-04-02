import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { path } from '../constants/pathConstant'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { acceptFriend, rejectFriend } from '../actions/friendActions'
const FriendRequest = ({ friend_id, user_id }) => {
  const [friendInfo, setFriendInfo] = useState({})
  const dispatch = useDispatch()
  const [show, setShow] = useState(true)

  useEffect(async () => {
    const profile = await axios.get(`${path}/users/${friend_id}`)
    setFriendInfo(profile.data)
  })

  const acceptHandler = async (e) => {
    e.preventDefault()
    dispatch(acceptFriend(friend_id))
    setShow(false)
  }

  const rejectHandler = async (e) => {
    e.preventDefault()
    dispatch(rejectFriend(friend_id))
    setShow(false)
  }

  return (
    <>
      {show && (
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{friendInfo.username}</Card.Title>
            <Card.Subtitle className='mb-2 text-muted'>
              <Link to={`/profile/${friend_id}`}>
                {friendInfo.username}'s Profile
              </Link>
            </Card.Subtitle>
            <Card.Text>
              Name: {friendInfo.first_name} {friendInfo.last_name}
            </Card.Text>
            <Card.Text>Gender: {friendInfo.gender}</Card.Text>
            <Row>
              <Col>
                <Button variant='primary' onClick={acceptHandler}>
                  Accept
                </Button>
              </Col>
              <Col>
                <Button variant='primary' onClick={rejectHandler}>
                  Decline
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}
    </>
  )
}

export default FriendRequest
