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
import { Link } from 'react-router-dom'
//import { joinTrip, leaveTrip } from '../actions/tripsActions'
//import { removeExpense } from '../actions/tripsActions'


const Expense = ({ expense }) => {
	const dispatch = useDispatch()

	//const isMember = trip.participant_ids.includes(userId)
	//const hasRequested = 	trip.join_requests.includes(userId)
  
  const [show, setShow] = useState(true)
	// const [member, setMember] = useState(isMember ? true : false)
	// const [requested, setRequested] = useState(hasRequested ? true : false)
	//const [btnText, setBtnText] = useState(isMember ? "Leave" : hasRequested ? "Requested" : "Join")
	const amount = expense.amount
	const description = expense.description
	const date = expense.date

	// const expenseButtonHandler = (e) => {
	// 	if (profileView) {
	// 		dispatch(leaveTrip(trip))
	// 		setShow(false)
	// 	} else if (member) {
	// 		dispatch(leaveTrip(trip))
	// 		setMember(false)
	// 		setBtnText("Join")
	// 	} else if (!requested) {
	// 		dispatch(joinTrip(trip))
	// 		setRequested(true)
	// 		setBtnText("Requested")
	// 	}
	// }

	return (
		<>
			{show && (
				<Card className="expense-card">
					<Card.Body>
						<Card.Title>
							{"$ " + amount}
						</Card.Title>
						<Card.Subtitle className='mb-2 text-muted'>
                            {"Date: " + date}
						</Card.Subtitle>

						<Card.Text>
							{ description }
						</Card.Text>
						{/* <Container>
							<Row>
								<Col>
									<Button
										variant='primary'
										onClick={(e) => tripButtonHandler(e)}>
										{btnText}
									</Button>
									<Link to={`trip/${trip._id}`}>
                      								View Trip
                    							</Link>
								</Col>
							</Row>
						</Container> */}
					</Card.Body>
				</Card>
			)}
		</>
	)
}

export default Expense