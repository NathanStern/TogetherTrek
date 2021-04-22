import '../index.css'
import React, { useEffect, useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import RangeSlider from 'react-bootstrap-range-slider';
import { useDispatch, useSelector } from 'react-redux'

import OtherUser from '../components/OtherUser'
import axios from 'axios'
import { path } from '../constants/pathConstant'
import { getNearbyUsers } from '../actions/userActions'

const NearbyUsersScreen = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.userLogin)
  const [nearbyUsers, setNearbyUsers] = useState([])
  const [range, setRange] = useState(20)
  const [show, setShow] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()
    const users = await getNearbyUsers(userInfo._id, range)
    setNearbyUsers(users)
    if (nearbyUsers && nearbyUsers.length > 0) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  return (
    <Container>
    <h2>Neaby Users</h2>
    <Form onSubmit={submitHandler}>
      <Form.Group controlId='range'>
        <Form.Label>Range</Form.Label>
        <br />
        <RangeSlider
          value={range}
          onChange={(e) => setRange(e.target.value)}
        />
      </Form.Group>
      <Button type='submit' variant='primary'>
        Search
      </Button>
    </Form>
    {show && nearbyUsers.map((el) =>
        <OtherUser otherUser={el}
        requested={el.friend_requests.contains(userInfo._id)}
        friends={userInfo.friend_ids.contains(el.id)} key={el.id}/>
    )}
    {!show && <p>No Users Found</p>}
    </Container>
  )
}

export default NearbyUsersScreen
