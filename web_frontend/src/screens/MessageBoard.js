import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const MessageBoard = ({ location, history, useParams }) => {
  const { pathname } = useLocation()

  const id = pathname.split('/')[2]

  return <div>id of the messageBoard is {id}</div>
}

export default MessageBoard
