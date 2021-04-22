import React, { useState, useEffect } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { path } from '../constants/pathConstant'
import {
  acceptUserTripRequest,
  declineUserTripRequest,
} from '../actions/tripsActions'
const UserRequest = ({ user_id, trip }) => {
  const dispatch = useDispatch()
  const [el, setEl] = useState()
  const [show, setShow] = useState(true)
  useEffect(async () => {
    const { data } = await axios.get(`${path}/users/${user_id}`)
    console.log(data)
    setEl(data)
  }, [])

  const acceptHandler = (e) => {
    e.preventDefault()
    dispatch(acceptUserTripRequest(trip._id, user_id, el))
    setShow(!show)
  }
  const rejectHandler = (e) => {
    e.preventDefault()
    dispatch(declineUserTripRequest(trip._id, user_id))
    setShow(!show)
  }
  return (
    <>
      {el && show && (
        <Card style={{ width: '18rem' }}>
          <Card.Header>Request To Join Trip</Card.Header>
          <Card.Body>
            <Card.Title>{el.username}</Card.Title>
            <Card.Subtitle className='mb-2 text-muted'>
              <Link to={`/profile/${el._id}`}>{el.username}'s Profile</Link>
            </Card.Subtitle>
            <Card.Text>
              Name: {el.first_name} {el.last_name}
            </Card.Text>
            <Card.Text>Gender: {el.gender}</Card.Text>
            <Card.Text>
              Trip Destination: {trip.destination.country} ->{' '}
              {trip.destination.city} -> {trip.destination.region}{' '}
            </Card.Text>
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

const RequestJoinTrip = ({ trip }) => {
  const { userInfo } = useSelector((state) => state.userLogin)
  console.log(trip)
  return (
    <>
      {trip.creator_id === userInfo._id &&
        trip.join_requests.length > 0 &&
        trip.join_requests.map((el) => (
          <UserRequest user_id={el} key={el._id} trip={trip} />
        ))}
    </>
  )
}

export default RequestJoinTrip
