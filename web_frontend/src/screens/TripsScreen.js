import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { getMyTrips, getTrips } from '../actions/tripsActions'
import { login } from '../actions/userActions'
import Trip from '../components/Trip'

const TripsScreen = ({ history }) => {
	const { userInfo } = useSelector((state) => state.userLogin)
	const { allTrips } = useSelector((state) => state.getAllTrips)

	// Ensure a user is logged in
	const redirect = '/'
	useEffect(() => {
		if (!userInfo) {
			history.push(redirect)
		}
	}, [history, userInfo, redirect])

	return (
		<>
			<Container>
				{allTrips &&
					allTrips
					.reverse()
					.map((el) =>
						(el === undefined ? <></> :
								<Trip trip={el} userId={userInfo._id} profileView={false} key={el._id}/>
						)
					)
				}
			</Container>
		</>
	)
}

export default TripsScreen
