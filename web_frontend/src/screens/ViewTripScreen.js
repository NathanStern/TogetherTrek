import '../index.css'
import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Container, Card } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Post from '../components/Post'
import Trip from '../components/Trip'
import Expense from '../components/Expense'
import { getMyPosts, deleteMyPost } from '../actions/postsActions'
import { getAllExpenses } from '../actions/expenseActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import axios from 'axios'
import { path } from '../constants/pathConstant'
const ViewTripScreen = ({ location, history, useParams }) => {
  const dispatch = useDispatch()
  //user info contains information about the user

  const [tripInfo, setTripInfo] = useState({})
  const { userInfo } = useSelector((state) => state.userLogin)
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [usernameRemove, setUsernameRemove] = useState('')
  const { allExpenses } = useSelector((state) => state.getAllExpenses)
  const { allTrips } = useSelector((state) => state.getAllTrips)
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [total, setTotal] = useState('')
  const [description, setDescription] = useState('')
  const [foods, setFoods] = useState([])
  const [transp, setTransp] = useState([])
  const [housing, setHousing] = useState([])
  const [other, setOther] = useState([])
  const [date, setDate] = useState(new Date())

  const { pathname } = useLocation()
  const id = pathname.split('/')[2]
  useEffect(async () => {
    const trip = await axios.get(`${path}/trips/${id}`)
    const foods = await axios.get(
      `${path}/expenses?trip_id=${id}&category=Food`
    )
    const transp = await axios.get(
      `${path}/expenses?trip_id=${id}&category=Transportation`
    )
    const housing = await axios.get(
      `${path}/expenses?trip_id=${id}&category=Housing`
    )
    const other = await axios.get(
      `${path}/expenses?trip_id=${id}&category=Other`
    )
    console.log('food' + foods)
    setFoods(foods.data)
    setTransp(transp.data)
    setHousing(housing.data)
    setOther(other.data)
    console.log(trip)
    setTripInfo(trip.data)
  }, [])
  const redirect = '/'
  useEffect(() => {
    if (!tripInfo) {
      history.push(redirect)
    }
  }, [history, tripInfo, redirect])

  const inviteUser = (e) => {
    e.preventDefault()
    const otherUser = axios.get(`${path}/users?username=${username}`)
    if (otherUser) {
      axios
        .put(`${path}/users/invite-user/${otherUser._id}`, {
          requesting_user_id: userInfo._id,
          trip_id: tripInfo._id,
        })
        .then((res) => {
          setMessage('Trip invite is Sent')
          setTimeout(() => {
            setMessage(null)
          }, 1000)
        })

      console.log('Sent invite request')
    }
  }

  const removeUser = (e) => {
    e.preventDefault()
    const otherUser = axios.get(`${path}/users?username=${usernameRemove}`)
    if (otherUser) {
      axios
        .put(`${path}/trips/remove-user/${tripInfo._id}`, {
          requesting_user_id: userInfo._id,
        })
        .then((res) => {
          setMessage('Remove request is Sent')
          setTimeout(() => {
            setMessage(null)
          }, 1000)
        })
    }
  }
  const addExpense = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${path}/expenses`, {
        expense_body: {
          amount: amount,
          creator_id: userInfo._id,
          description: description,
          date: date,
        },
        category: category,
        trip_id: tripInfo._id,
      })
      console.log(`adding ${res}`)
      await axios.put(`${path}/trips/${tripInfo._id}`, {
        expenses: tripInfo.expenses.concat(res.data),
      })
      setMessage('Expense Added')
      history.push('/')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      {message && <Message variant='success'>{message}</Message>}

      {tripInfo && (
        <Row>
          <Col md={3}>
            <h2>Trip Info</h2>
            <div>Destination: </div>
            <div>Start Date: {tripInfo.startDate}</div>
            <div>End Date: {tripInfo.endDate}</div>
          </Col>
          <Col md={3}>
            <h2>Users</h2>
            <FormContainer>
              <Form onSubmit={inviteUser}>
                <Form.Group controlId='confirmPassword'>
                  <Form.Label>Add User (username)</Form.Label>
                  <Form.Control
                    type='Username'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  ></Form.Control>
                  <Button type='submit' variant='primary' onClick={inviteUser}>
                    Submit
                  </Button>
                </Form.Group>
              </Form>
            </FormContainer>
          </Col>
          <Col md={3}>
            <h3>Remove User</h3>
            <FormContainer>
              <Form onSubmit={removeUser}>
                <Form.Group controlId='confirmPassword'>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type='Username'
                    placeholder='Username'
                    value={usernameRemove}
                    onChange={(e) => setUsernameRemove(e.target.value)}
                  ></Form.Control>
                  <Button type='submit' variant='primary' onClick={removeUser}>
                    Submit
                  </Button>
                </Form.Group>
              </Form>
            </FormContainer>
          </Col>
          <Col md={3}>
            <h3>Add Expense</h3>
            <FormContainer>
              <Form onSubmit={addExpense}>
                <Form.Group controlId='text'>
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Amount'
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='text'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='select'>
                  <Form.Label>Select</Form.Label>
                  <Form.Control
                    as='select'
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>Food</option>
                    <option>Transportation</option>
                    <option>Housing</option>
                    <option>Other</option>
                    value={category}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId='date'>
                  <Form.Label>Enter Date</Form.Label>
                  <Form.Control
                    type='date'
                    placeholder='Enter Date'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                {/* <Button type='submit' variant='primary' onClick={addExpense}>
              				Submit
            			</Button> */}
                <Button
                  variant='primary'
                  onClick={(e) => {
                    addExpense(e)
                  }}
                >
                  Post
                </Button>
              </Form>
            </FormContainer>
          </Col>
        </Row>
      )}
      <h2>My Expenses</h2>
      {/* <Col md={3}> */}
      <h3>Food</h3>
      {/* <Container>
              {allExpenses &&
                allExpenses.map((el) =>
                  (el === undefined ? <></> :
    									<Expense expense={el} trip={tripInfo} current_trip={tripInfo._id} key={el._id}/>
    							)
                )
              }
            </Container> */}
      <Container>
        {foods &&
          foods.map((el) =>
            el === undefined ? (
              <></>
            ) : (
              <Expense
                expense={el}
                trip={tripInfo}
                current_trip={tripInfo._id}
                key={el._id}
              />
            )
          )}
      </Container>
      {/* </Col> */}

      {/* <Col md={3}> */}
      <h3>Transportation</h3>
      <Container>
        {transp &&
          transp.map((el) =>
            el === undefined ? (
              <></>
            ) : (
              <Expense
                expense={el}
                trip={tripInfo}
                current_trip={tripInfo._id}
                key={el._id}
              />
            )
          )}
      </Container>
      {/* </Col>
        <Col md={3}> */}
      <h3>Housing</h3>
      <Container>
        {housing &&
          housing.map((el) =>
            el === undefined ? (
              <></>
            ) : (
              <Expense
                expense={el}
                trip={tripInfo}
                current_trip={tripInfo._id}
                key={el._id}
              />
            )
          )}
      </Container>
      {/* </Col>
          <Col md={3}> */}
      <h3>Other</h3>
      <Container>
        {other &&
          other.map((el) =>
            el === undefined ? (
              <></>
            ) : (
              <Expense
                expense={el}
                trip={tripInfo}
                current_trip={tripInfo._id}
                key={el._id}
              />
            )
          )}
      </Container>
      {/* </Col> */}
      <Col md={3}>
        <h3>Total: </h3>
        <Container></Container>
      </Col>
    </>
  )
}

export default ViewTripScreen
