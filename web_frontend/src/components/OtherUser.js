import '../index.css'
import React, { useState } from 'react'
import { Card, Col, Container, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { path } from '../constants/pathConstant'
import { requestFriend } from '../actions/friendActions'
import { useDispatch, useSelector } from 'react-redux'

const OtherUser = ({ otherUser, requested, friends }) => {
  const dispatch = useDispatch()
  const buttonText = "Add"
  if (requested) {
    buttonText = "Requested"
  }
  if (friends) {
    buttonText = "Friends"
  }
  const [friendBtnText, setFriendBtnText] = useState(buttonText)
  const [req, setReq] = useState(requested)

  let profilePic =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  if (otherUser.profile_pic) {
    profilePic = path + `/users/profile-pic/${otherUser._id}`
  }

  const addFriendHandler = (e) => {
    if (!friends && !requested) {
      dispatch(requestFriend(otherUser._id))
      setFriendBtnText('Requested')
      setReq(true)
    }
  }

  return (
    <>
      {
        <Card className='friend-card'>
          <Link to={`/profile/${otherUser._id}`}>
            <Card.Img src={profilePic} />
          </Link>
          <Card.Body>
            <Card.Title>{otherUser.username + "-" + otherUser.distance + "miles"}</Card.Title>
            <Row>
              <Col className='half-col'>
                <Button
                  variant='primary'
                  className='half-button'
                  onClick={(e) => addFriendHandler(e)}
                >
                  {friendBtnText}
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      }
    </>
  )
}

export default OtherUser
