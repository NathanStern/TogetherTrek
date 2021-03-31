import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import FriendRequest from '../components/FriendRequest'
import Message from '../components/Message'
import TripRequest from '../components/TripRequest'
const NotificationsScreen = () => {
  const { userInfo } = useSelector((state) => state.userLogin)
  const acceptFriend = useSelector((state) => state.acceptFriendRequest)
  const rejectFriend = useSelector((state) => state.rejectFriendRequest)
  console.log(userInfo)
  return (
    <div>
      {userInfo && (
        <Container>
          {acceptFriend.loading && (
            <Message variant='success'>Request Accepted</Message>
          )}
          {rejectFriend.loading && (
            <Message variant='success'>Request Rejected</Message>
          )}
          <Row>
            <Col>
              <h2>Friend Requests</h2>
              {userInfo.friend_requests.map((el) => (
                <FriendRequest friend_id={el} key={el} user_id={userInfo._id} />
              ))}
            </Col>
            <Col>
              <h2>Trip Requests</h2>
              {userInfo.trip_requests.map((el) => (
                <TripRequest trip_id={el} key={el} />
              ))}
            </Col>
          </Row>
        </Container>
      )}
    </div>
  )
}

export default NotificationsScreen
