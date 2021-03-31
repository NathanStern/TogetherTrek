import '../index.css'
import React, { useEffect, useState } from 'react'
import {
	Card,
	Button,
	Container,
	Row,
	Col,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { leaveTrip } from '../actions/tripsActions'

const Trip = ({ trip, personal }) => {
	const dispatch = useDispatch()
	const [show, setShow] = useState(true)
	const [edit, setEdit] = useState(false)

	const [destination, setDestination] = useState(trip.destination)
	const [startDate, setStartDate] = useState(trip.start_date)
	const [endDate, setEndDate] = useState(trip.end_date)


	const leaveHandler = (e) => {
		e.preventDefault()
		setShow(!show)
		dispatch(leaveTrip(trip))
	}

	return (
		<>
			{show && (
				<Card className="trip-card">
					<Card.Body>
						<Card.Title>
							{"city" in destination ? destination.city + ", ": ""}
							{"country" in destination ? destination.country : ""}
						</Card.Title>
						<Card.Subtitle className='mb-2 text-muted'>
									{"region" in destination ? destination.region : ""}
						</Card.Subtitle>
						<Card.Text>
							{"From: " + startDate + ", To: " + endDate}
						</Card.Text>
						{personal && (
							<Container>
								<Row>
                  <Col>
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
