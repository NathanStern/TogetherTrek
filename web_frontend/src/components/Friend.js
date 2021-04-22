import '../index.css'
import React, { useState } from 'react'
import { Card, Col, Container, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { path } from '../constants/pathConstant'

const Friend = ({ friend }) => {
  const [show, setShow] = useState(true)

  let profilePic =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  if (friend.profile_pic) {
    profilePic = path + `/users/profile-pic/${friend._id}`
  }

  const messageFriend = (e) => {
    console.log('Not implemented')
  }

  const removeFriend = (e) => {
    setShow(false)
  }

  return (
    <>
      {show && (
        <Card className='friend-card'>
          <Link to={`/profile/${friend._id}`}>
            <Card.Img src={profilePic} />
          </Link>
          <Card.Body>
            <Card.Title>{friend.username}</Card.Title>
            <Row>
              <Col className='half-col'>
                <Link to={`/messages`}>
                  <Button variant='primary'>Message</Button>
                </Link>
              </Col>
              <Col className='half-col'>
                <Button variant='primary' onClick={(e) => removeFriend(e)}>
                  Remove
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}
    </>
  )
}

export default Friend
