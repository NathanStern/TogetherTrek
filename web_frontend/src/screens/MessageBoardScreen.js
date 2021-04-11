// import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import axios from 'axios'
// import { path } from '../constants/pathConstant'
import axios from 'axios'
import { path } from '../constants/pathConstant'
import MessageBoard from '../components/MessageBoard'

const MessageBoardScreen = ({ location, history, useParams }) => {
  const { pathname } = useLocation()
  const { userInfo } = useSelector((state) => state.userLogin)
  console.log("userInfo:")
  console.log(userInfo)
  const messageBoardId = pathname.split('/')[2]

  return (
    <MessageBoard messageBoardId={messageBoardId} userId={userInfo._id}/>
  )
}

export default MessageBoardScreen
