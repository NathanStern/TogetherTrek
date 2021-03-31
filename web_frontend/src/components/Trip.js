import '../index.css'
import React, { useEffect, useState } from 'react'
import {
	Card,
	Button,
	Container,
	Row,
	Col,
} from 'react-bootstrap'
import { joinTrip, leaveTrip } from '../actions/tripsActions'

class Trip extends React.Component {
	constructor(props) {
		super(props);
		let isMember = false
		let hasRequested = false
		let btnText = "Join"
		let userId = props.userId
		let trip = props.trip
		let profileView = props.profileView
		console.log("TRIPTRIP")
		console.log(trip)
		if (trip.participant_ids.includes(userId)) {
			isMember = true
			btnText = "Leave"
		}
		if (trip.join_requests.includes(userId)) {
			hasRequested = true
			btnText = "Requested"
		}

		this.state = {
			isMember: isMember,
			hasRequested: hasRequested,
			btnText: btnText,
			trip: trip,
			profileView: profileView,
			show: true
		}
	}

	tripButtonHandler = () => {
		if (this.state.profileView) {
			leaveTrip(this.state.trip)
			this.setState({show: false})
		} else if (this.state.isMember) {
			leaveTrip(this.state.trip)
			this.setState({btnText: "Join"})
		} else if (!this.state.hasRequested) {
			joinTrip(this.state.trip)
			this.setState({btnText: "Requested"})
		}
	}

	render() {
		const destination = this.state.trip.destination
		const startDate = this.state.trip.start_date
		const endDate = this.state.trip.end_date
		return (
			<>
				{this.state.show && (
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
							{<Container>
								<Row>
	                <Col>
	                  <Button
	                    variant='primary'
	                    onClick={(e) => {
	                      this.tripButtonHandler(e)
	                    }}
	                  >
	                    {this.state.btnText}
	                  </Button>
	                </Col>
								</Row>
							</Container>}
						</Card.Body>
					</Card>
				)}
			</>
		)
	}
}

export default Trip
