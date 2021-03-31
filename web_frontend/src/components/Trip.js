import React, { useEffect, useState } from 'react'
import {
	Card,
	Button,
	Container,
	Row,
	Col,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { leaveTrip } from '../actions/tripsActions'

const Trip = ({ trip, personal }) => {
	// console.log(trip)
	const dispatch = useDispatch()
	const [show, setShow] = useState(true)
	const [edit, setEdit] = useState(false)

	const [destination, setDestination] = useState(trip.destination)
	const [startDate, setStartDate] = useState(trip.startDate)

	const leaveHandler = (e) => {
		e.preventDefault()
		setShow(!show)
		dispatch(leaveTrip(trip))
	}

	return (
		<>
			{show && (
				<Card style={{ width: '18rem' }}>
					<Card.Body>
						<Card.Title>{destination.city}</Card.Title>
						<Card.Subtitle className='mb-2 text-muted'>
						      {destination.city}, {destination.country} {destination.region}
						</Card.Subtitle>
						<Card.Text>{startDate}</Card.Text>
						{personal && (
							<Container>
								<Row>
                  <Col>
				  <Link to={`/trip/${trip.id}`}>
                      View Trip
                    </Link>
                    <Button
                      variant='primary'
                      onClick={(e) => {
                        leaveHandler(e)
                      }}
                    >
                      Leave
                    </Button>
                  </Col>
								</Row>
							</Container>
						)}
					</Card.Body>
				</Card>
			)}
		</>
	)
}

export default Trip
