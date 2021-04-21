import '../index.css'
import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { getMyPosts, getPosts } from '../actions/postsActions'
import {
  getUserFriends,
  login,
  getUserMessageBoards,
  getBlockedUsers,
} from '../actions/userActions'
import { getMyTrips, getTrips } from '../actions/tripsActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { getAllExpenses } from '../actions/expenseActions'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const { userInfo, error } = useSelector((state) => state.userLogin)
  const [loading, setLoading] = useState(false)
  let token = ''
  let encToken = ''
  let load = true
  useEffect(() => {
    if (userInfo) {
      const userPassword = localStorage.getItem('userPassword')

      console.log(`password is ${userPassword}, login is ${userInfo.username}`)
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1600)
      dispatch(login(userInfo.username, userPassword)).then((e) => {
        setTimeout(() => {
          dispatch(getBlockedUsers())
          dispatch(getUserFriends())
          dispatch(getMyPosts())
          dispatch(getPosts())
          dispatch(getMyTrips())
          dispatch(getTrips())
          dispatch(getAllExpenses())
          dispatch(getUserMessageBoards())
        }, 1200)
      })
    }
  }, [])

  return (
    <div>
      <Row>
        <Col>
          {loading && <Loader />}
          <div className='py-3'>
            Travelling alone while abroad is fairly standard, but it can be
            unsafe to do so. Because of this, many solo travellers have taken to
            finding people to travel with wherever they may be in their journey.
            TogetherTrek makes this process easy by offering users ways to match
            with like-minded individuals in a safe and secure way. This is done
            through creating and sharing travel itineraries or finding others
            using the service near you. While there are many other services that
            allow users to find travel partners, like Gaffl, TogetherTrek is one
            of, if not the only, one that offers real-time safety features, trip
            budgeting, and groups of more than just 2 people.
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default HomeScreen
