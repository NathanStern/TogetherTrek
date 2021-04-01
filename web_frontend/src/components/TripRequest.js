import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Accordion, Card, Col, ListGroup, Row, Button } from 'react-bootstrap'
import { path } from '../constants/pathConstant'
import { acceptTrip, declineTrip } from '../actions/tripsActions'
import { declineTripRequestReducer } from '../reducers/tripsReducers'

const getFriend = async (friend_id) => {
  try {
    const post = await axios.get(`${path}/users/${friend_id}`)
    return post.data
  } catch (err) {
    console.log(err)
  }
}

const TripRequest = ({ trip_id }) => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(true)
  const [tripInfo, setTripInfo] = useState('')
  const [participants, setParticipants] = useState('')
  useEffect(async () => {
    const { data } = await axios.get(`${path}/trips/${trip_id}`)
    setTripInfo(data)
    let users = []
    data.participant_ids.map((el) => {
      getFriend(el).then((res) => {
        users.push(res)
      })
    })
    setTimeout(() => {
      setParticipants(users)
    }, 1000)
    console.log(participants)
  }, [])

  const acceptHandler = async (e) => {
    e.preventDefault()
    dispatch(acceptTrip(trip_id))
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.put()
    setShow(false)
  }

  const rejectHandler = async (e) => {
    e.preventDefault()
    dispatch(declineTrip(trip_id))
    setShow(false)
  }

  return (
    <>
      {tripInfo && show && (
        <Accordion defaultActiveKey='0'>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>
                <Accordion.Collapse eventKey='1'>
                  <>
                    <div>Participants:</div>

                    <Card.Body>
                      {participants.length > 0 &&
                        participants.map((user) => (
                          <div key={user._id}>
                            {user.first_name} {user.last_name}
                          </div>
                        ))}
                    </Card.Body>
                  </>
                </Accordion.Collapse>
              </Card.Title>
              <Card.Subtitle className='mb-2 text-muted'>
                {tripInfo.start_date} to {tripInfo.end_date}
              </Card.Subtitle>
              <Card.Text>
                {tripInfo.destination.country} ->{tripInfo.destination.city} ->
                {tripInfo.destination.region}
              </Card.Text>
              <Accordion.Toggle as={Button} variant='primary' eventKey='1'>
                Participants
              </Accordion.Toggle>
            </Card.Body>
            <Card.Header>
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
            </Card.Header>
          </Card>
        </Accordion>
      )}
    </>
  )
}

export default TripRequest
