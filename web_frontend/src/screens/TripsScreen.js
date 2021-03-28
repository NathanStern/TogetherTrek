import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getMyTrips, getTrips } from '../actions/tripsActions'
import { login } from '../actions/userActions'
import Trip from '../components/Trip'
const TripsScreen = ({ history }) => {
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
		</>
	)
}

export default TripsScreen
