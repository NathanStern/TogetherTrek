import '../index.css'
import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import Message from '../components/Message'
import { path } from '../constants/pathConstant'
import { useSelector } from 'react-redux'
const CreateTripScreen = ({ history }) => {
  const { userInfo } = useSelector((state) => state.userLogin)

  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [region, setRegion] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [message, setMessage] = useState('')

  const tripHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${path}/trips`, {
        destination: {
          country: country,
          city: city,
          region: region,
        },
        start_date: startDate,
        end_date: endDate,
        creator_id: userInfo._id,
        participant_ids: [userInfo._id],
      })

      // const expres = await axios.post(`${path}/expenses`, {
      // 	expense_body: {
      // 	amount: 44,
      // 	creator_id: userInfo._id,
      // 	description: city,
      // 	date: startDate,
      // 	},
      // 	trip_id: res.data,
      // })
      // console.log(expres);
      await axios.put(`${path}/users/${userInfo._id}`, {
        trip_ids: userInfo.trip_ids.concat(res.data),
      })
      setMessage('Trip Added')
      history.push('/')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      {message && <Message variant='success'>{message}</Message>}
      <Form>
        <Form.Group controlId='date'>
          <Form.Label>Enter Start Date</Form.Label>
          <Form.Control
            type='date'
            placeholder='Enter Last Name'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='date'>
          <Form.Label>Enter End Date</Form.Label>
          <Form.Control
            type='date'
            placeholder='Enter Last Name'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='text'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='text'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter City'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='text'>
          <Form.Label>Region</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Region'
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          variant='primary'
          onClick={(e) => {
            tripHandler(e)
          }}
        >
          Post
        </Button>
      </Form>
    </>
  )
}

export default CreateTripScreen
