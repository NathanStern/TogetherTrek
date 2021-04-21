import '../index.css'
import React, { useEffect, useState } from 'react'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { joinTrip, leaveTrip } from '../actions/tripsActions'

const Trip = ({ trip, userId, profileView }) => {
  const dispatch = useDispatch()

  const isMember = trip.participant_ids.includes(userId)
  const hasRequested = trip.join_requests.includes(userId)

  const [show, setShow] = useState(true)
  const [member, setMember] = useState(isMember ? true : false)
  const [requested, setRequested] = useState(hasRequested ? true : false)
  const [btnText, setBtnText] = useState(
    isMember ? 'Leave' : hasRequested ? 'Requested' : 'Join'
  )
  const destination = trip.destination
  const startDate = trip.start_date
  const endDate = trip.end_date

  const tripButtonHandler = (e) => {
    if (profileView) {
      dispatch(leaveTrip(trip))
      setShow(false)
    } else if (member) {
      dispatch(leaveTrip(trip))
      setMember(false)
      setBtnText('Join')
    } else if (!requested) {
      dispatch(joinTrip(trip))
      setRequested(true)
      setBtnText('Requested')
    }
  }

  return (
    <>
      {show && (
        <Card className='trip-card'>
          <Card.Body>
            <Card.Title>
              {'city' in destination ? destination.city + ', ' : ''}
              {'country' in destination ? destination.country : ''}
            </Card.Title>
            <Card.Subtitle className='mb-2 text-muted'>
              {'region' in destination ? destination.region : ''}
            </Card.Subtitle>
            {trip.budget && <Card.Text>Budget: {trip.budget}</Card.Text>}
            <Card.Text>{'From: ' + startDate + ', To: ' + endDate}</Card.Text>
            <Container>
              <Row>
                <Col className='half-col'>
                  <Button
                    variant='primary'
                    onClick={(e) => tripButtonHandler(e)}
                  >
                    {btnText}
                  </Button>
                </Col>
                <Col className='half-col'>
                  <Link to={`trip/${trip._id}`}>View Trip</Link>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      )}
    </>
  )
}

export default Trip
