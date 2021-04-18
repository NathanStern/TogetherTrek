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


const Expense = ({ trip, current_trip, expense }) => {
	const dispatch = useDispatch()

	//const isMember = trip.participant_ids.includes(userId)
	//const hasRequested = 	trip.join_requests.includes(userId)
  console.log(current_trip);
  console.log(expense.trip_id);
  const isequal = trip.expenses.includes(expense_body)
  const [show, setShow] = useState( isequal ? true : false)
	// const [member, setMember] = useState(isMember ? true : false)
	// const [requested, setRequested] = useState(hasRequested ? true : false)
	//const [btnText, setBtnText] = useState(isMember ? "Leave" : hasRequested ? "Requested" : "Join")
	const expense_body = expense.expense_body
	const category = expense.category
	const trip_id = expense.trip_id
	// if (current_trip != trip_id) {
	// 	setShow(false);
	// }


	return (
		<>
			{show && (
				<Card className="expense-card">
					<Card.Body>
						<Card.Title>
						{"amount" in expense_body ? expense_body.amount : ""}
						</Card.Title>
						<Card.Subtitle className='mb-2 text-muted'>
						{"date" in expense_body ? expense_body.date : ""}
						</Card.Subtitle>

						<Card.Text>
						{"description" in expense_body ? expense_body.description : ""}
						</Card.Text>
					</Card.Body>
				</Card>
			)}
		</>
	)
}

export default Expense