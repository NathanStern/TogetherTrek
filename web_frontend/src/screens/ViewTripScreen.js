import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getMyTrips, getTrips } from '../actions/tripsActions'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import Trip from '../components/Trip'
const ViewTripScreen = ({ history }) => {
	const redirect = '/'
	const { userInfo } = useSelector((state) => state.userLogin)

	useEffect(() => {
		if (!userInfo) {
			history.push(redirect)
		}
	}, [history, userInfo, redirect])
	const dispatch = useDispatch()
	const { allTrips } = useSelector((state) => state.getAllTrips)
	console.log(allTrips)
	return (
		<>
			{allTrips && (
				<Container>
					{allTrips && allTrips.map((el) => <Trip trip={el} key={el._id} />)}
				</Container>
			)}
			<FormContainer>
				<Link to={'/profile'}>Back To Profile</Link>
			</FormContainer>
		</>
	)
}

export default ViewTripScreen