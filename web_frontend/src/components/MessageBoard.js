import React, { useState } from 'react'
import { Accordion, Card, Button, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const findAuthor = (message, userInfo, messageBoardInfo) => {
  let author = ''
  if (Object.keys(message).length === 0) return author
  console.log(userInfo._id)
  console.log(message.author_id)
  if (message.author_id === userInfo._id) {
    author = `${userInfo.first_name} ${userInfo.last_name}`
  } else {
    author = messageBoardInfo.other_users.find(
      (user) => user.id === message.author_id
    ).name
  }
  return `${author}: `
}

const MessageBoard = ({ messageBoardInfo }) => {
  const { userInfo } = useSelector((state) => state.userLogin)
  const message = messageBoardInfo.latest_message
  const author = findAuthor(message, userInfo, messageBoardInfo)

  return (
    <Accordion defaultActiveKey='0'>
      <Card>
        <Card.Body>
          {Object.keys(message).length > 0 && (
            <>
              <Card.Title>Latest Message</Card.Title>
              <Card.Subtitle className='mb-2 text-muted'>
                {author}
              </Card.Subtitle>
            </>
          )}
          {Object.keys(message).length === 0 ? (
            <Card.Text>
              <b>
                It's a placeholder text if there are no messages in the
                messageboard.
              </b>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </Card.Text>
          ) : (
            <Card.Text>{message.data}</Card.Text>
          )}
        </Card.Body>
        <Card.Header>
          <Row>
            <Col>
              <Accordion.Toggle as={Button} variant='primary' eventKey='1'>
                Users
              </Accordion.Toggle>
            </Col>
            <Col>
              <Link to={`/messages/${messageBoardInfo._id}`}>
                <Button variant='primary'>Message</Button>
              </Link>
            </Col>
          </Row>
        </Card.Header>
        <Accordion.Collapse eventKey='1'>
          <Card.Body>
            {messageBoardInfo.other_users.map((user) => (
              <div key={user.name}>{user.name}</div>
            ))}
          </Card.Body>
        </Accordion.Collapse>
        <Card.Footer>
          {Object.keys(message).length === 0 ? (
            <small className='text-muted'>Message Board is Empty</small>
          ) : (
            <small className='text-muted'>{message.post_date}</small>
          )}
        </Card.Footer>
      </Card>
    </Accordion>
  )
}

export default MessageBoard
