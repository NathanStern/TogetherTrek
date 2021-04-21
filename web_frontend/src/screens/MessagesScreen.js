import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  CardColumns,
  CardDeck,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap'
import { path } from '../constants/pathConstant'
import { useSelector, useDispatch } from 'react-redux'
import MessageBoardCard from '../components/MessageBoardCard'
import MessageBoard from '../components/MessageBoard'
import axios from 'axios'
import { addMessageBoard } from '../actions/profilesActions'
import Message from '../components/Message'
import { getUserMessageBoards } from '../actions/userActions'
const RequestFriend = ({ friend, show, members, setMembers }) => {
  const [message, setMessage] = useState('Add')
  const addMember = (e) => {
    e.preventDefault()
    if (!members.includes(friend)) {
      setMembers(members.concat(friend))
      setMessage('Remove')
    } else {
      setMembers(members.filter((el) => el !== friend))
      setMessage('Add ')
    }
  }

  return (
    <ListGroup.Item>
      <Container className='ml-auto'>
        <Row>
          <Col>
            {friend.first_name} {friend.last_name}
          </Col>
          <Col>
            <Button variant='primary' onClick={addMember}>
              {message}
            </Button>
          </Col>
        </Row>
      </Container>
    </ListGroup.Item>
  )
}

const MessagesScreen = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.userLogin)
  const { friendsInfo } = useSelector((state) => state.getFriends)
  const { messageBoardsInfo } = useSelector((state) => state.getMyMessageBoards)
  const [message, setMessage] = useState('')
  const [show, setShow] = useState(false)
  const [members, setMembers] = useState([userInfo])
  const editHandler = (e) => {
    e.preventDefault()
    setShow(!show)
  }

  const createMessageBoard = async (e) => {
    e.preventDefault()
    let user_ids = []
    members.forEach((e) => {
      user_ids.push(e._id)
    })
    // const data = '228'
    // console.log(user_ids)
    const { data } = await axios.post(`${path}/message_boards`, {
      user_ids: user_ids,
    })
    console.log(data)

    dispatch(addMessageBoard(user_ids, data))
    setTimeout(() => {
      dispatch(getUserMessageBoards())
    }, 800)
    setShow(!show)
    setMessage('MessageBoard Successfully Created!')
    setTimeout(() => {
      setMessage('')
    }, 1200)
  }
  return (
    <>
      {message && <Message variant='success'>{message}</Message>}
      <h2>MessageBoards</h2>
      <Button onClick={editHandler}>
        {show ? (
          <span>Close MessageBoard Creation</span>
        ) : (
          <span>Create MessageBoard</span>
        )}
      </Button>
      {!show ? (
        <CardColumns>
          {messageBoardsInfo.map((msb) => (
            <MessageBoardCard messageBoardInfo={msb} key={msb._id} />
          ))}
        </CardColumns>
      ) : (
        <Row>
          <Col>
            <h3>Friends:</h3>
            <Card style={{ width: '18rem' }}>
              <ListGroup variant='flush'>
                {friendsInfo.map((el) => (
                  <RequestFriend
                    friend={el}
                    key={el.username}
                    show={show}
                    members={members}
                    setMembers={setMembers}
                  />
                ))}
              </ListGroup>
            </Card>
          </Col>
          <Col>
            <h3>Members:</h3>
            <Card style={{ width: '18rem' }}>
              <Button variant='primary' onClick={createMessageBoard}>
                Submit
              </Button>

              <ListGroup variant='flush'>
                {members.length > 0 &&
                  members.map((el) => (
                    <ListGroup.Item key={el.username}>
                      {el.username}
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      )}
    </>
  )
}

export default MessagesScreen
