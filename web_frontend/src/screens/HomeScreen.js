import '../index.css'
import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { getMyPosts, getPosts } from '../actions/postsActions'
import { getUserFriends, login } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import jwt_decode from 'jwt-decode'
import { useLocation } from 'react-router'
import { getMyTrips } from '../actions/tripsActions'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const { userInfo, loading } = useSelector((state) => state.userLogin)
  let token = ''
  let encToken = ''
  useEffect(() => {
    if (userInfo) {
      dispatch(getPosts())
      token = JSON.parse(localStorage.getItem('myToken'))
      encToken = JSON.parse(localStorage.getItem('encToken'))
      dispatch(login(userInfo.username, userInfo.password)).then((e) =>
        dispatch(getUserFriends())
      )
      dispatch(login(token, encToken)).then((e) => dispatch(getUserFriends()))
      dispatch(getMyPosts())
      dispatch(getMyTrips())
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
