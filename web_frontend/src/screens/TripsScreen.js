import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, FormControl, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { getMyTrips, getTrips } from '../actions/tripsActions'
import { login } from '../actions/userActions'
import Trip from '../components/Trip'

const TripsScreen = ({ history }) => {
  const { userInfo } = useSelector((state) => state.userLogin)
  const { allTrips } = useSelector((state) => state.getAllTrips)
  const [budget, setBudget] = useState('')
  const [location, setLocation] = useState('')
  const [showTrips, setShowTrips] = useState()
  // Ensure a user is logged in
  const redirect = '/'
  useEffect(() => {
    setShowTrips(allTrips)
  }, [])

  useEffect(() => {
    if (!userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const searchHandler = (e) => {
    e.preventDefault()
    console.log(`budget:${budget} location: ${location}`)
    let arr
    if (budget.length == 0 && location.length == 0) {
      setShowTrips(allTrips)
      return
    } else if (budget.length > 0) {
      arr = allTrips.filter((el) => el.budget && el.budget <= budget)
    } else {
      arr = allTrips.filter(
        (el) =>
          el.destination.country === location ||
          el.destination.city === location ||
          el.destination.region === location
      )
    }
    console.log(arr)
    setShowTrips(arr)
  }
  return (
    <>
      <Container>
        <Form inline>
          <span>
            Budget:
            <FormControl
              type='text'
              placeholder='Search'
              value={budget}
              onChange={(e) => {
                setBudget(e.target.value)
                setLocation('')
              }}
              className='mr-sm-2'
            />
          </span>
          <span>
            Location:
            <FormControl
              type='text'
              placeholder='Search'
              value={location}
              onChange={(e) => {
                setLocation(e.target.value)
                setBudget('')
              }}
              className='mr-sm-2'
            />
          </span>
          <Button variant='outline-light' onClick={searchHandler}>
            Search
          </Button>
        </Form>
        {showTrips &&
          showTrips.map((el) =>
            el === undefined ? (
              <></>
            ) : (
              <Trip
                trip={el}
                userId={userInfo._id}
                profileView={false}
                key={el._id}
              />
            )
          )}
      </Container>
    </>
  )
}

export default TripsScreen
