import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import {
  acceptUserTripRequest,
  declineUserTripRequest,
} from '../actions/tripsActions'

import FriendRequest from '../components/FriendRequest'
import Message from '../components/Message'
import RequestJoinTrip from '../components/RequestJoinTrip'
import TripRequest from '../components/TripRequest'
const NotificationsScreen = () => {
  const { userInfo } = useSelector((state) => state.userLogin)

import FriendRequest from '../components/FriendRequest'
import Message from '../components/Message'
import TripRequest from '../components/TripRequest'
const NotificationsScreen = () => {
  const { userInfo } = useSelector((state) => state.userLogin)
  const acceptFriend = useSelector((state) => state.acceptFriendRequest)
  const rejectFriend = useSelector((state) => state.rejectFriendRequest)
  const acceptTrip = useSelector((state) => state.acceptTripRequest)
  const declineTrip = useSelector((state) => state.declineTripRequest)

  const acceptUser = useSelector((state) => state.acceptUserJoinTripRequest)
  const declineUser = useSelector((state) => state.declineUserJoinTripRequest)

  const { myTrips } = useSelector((state) => state.getMyTrips)
  console.log(myTrips)

  console.log(userInfo)
  return (
    <div>
      {userInfo && (
        <Container>

          {(acceptFriend.loading ||
            acceptTrip.loading ||
            acceptUser.loading) && (
            <Message variant='success'>Request Accepted</Message>
          )}
          {(rejectFriend.loading ||
            declineTrip.loading ||
            declineUser.loading) && (
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

              {myTrips.map((el) => (
                <RequestJoinTrip trip={el} key={el._id} />
              ))}

            </Col>
          </Row>
        </Container>
      )}
    </div>
  )
}

export default NotificationsScreen
