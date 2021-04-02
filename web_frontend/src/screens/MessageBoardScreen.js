import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { path } from '../constants/pathConstant'
const MessageBoardScreen = ({ location, history, useParams }) => {
  const { pathname } = useLocation()
  const { userInfo } = useSelector((state) => state.userLogin)
  const id = pathname.split('/')[2]

  const [messageBoard, setMessageBoard] = useState()
  const { friendsInfo } = useSelector((state) => state.getFriends)
  const [participants, setParticipants] = useState([])
  useEffect(async () => {
    const { data } = await axios.get(`${path}/message_boards/${id}`)
    console.log(data)
    setMessageBoard(data)
    let people = friendsInfo.filter((el) => data.user_ids.includes(el._id))
    console.log(people)
    setParticipants(people)
  }, [])
  return (
    <>
      <h3>Participants:</h3>
      <div>
        {userInfo.first_name} {userInfo.last_name}
      </div>
      {participants.length > 0 &&
        participants.map((el) => (
          <div>
            {el.first_name} {el.last_name}
          </div>
        ))}
      {/* <div>id of the messageBoard is {id}</div> */}
    </>
  )
}

export default MessageBoardScreen
