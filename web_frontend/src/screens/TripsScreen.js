import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getMyTrips, getTrips } from '../actions/tripsActions'
import { login } from '../actions/userActions'
import Trip from '../components/Trip'

const TripsScreen = ({ history }) => {
	const dispatch = useDispatch()

	// Ensure a user is logged in
	const redirect = '/'
	const { userInfo } = useSelector((state) => state.userLogin)
	useEffect(() => {
		if (!userInfo) {
			history.push(redirect)
		}
	}, [history, userInfo, redirect])

	const { allTrips } = useSelector((state) => state.getAllTrips)

	return (
		<>
			{allTrips && (
				<Container>
					{allTrips &&
						allTrips.map((el) =>
							(el === undefined ? <></> : <Trip trip={el} userId={userInfo._id} profileView={false} />)
						)
					}
				</Container>
			)}
		</>
	)
}

export default TripsScreen
