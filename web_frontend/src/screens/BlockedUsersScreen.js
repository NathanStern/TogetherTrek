import React, { useState, useEffect } from 'react'
import { Button, Card, CardColumns } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { path } from '../constants/pathConstant'
const BlockedUser = ({ user, userInfo }) => {
  console.log(user)
  const [show, setShow] = useState(true)
  const [profilePic, setProfilePic] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  )
  useEffect(() => {
    if (user.profile_pic) {
      setProfilePic(user.profile_pic)
    }
  }, [])
  const unblockButtonHandler = async (e) => {
    e.preventDefault()
    const { data } = await axios.put(
      `${path}/users/unblock-user/${userInfo._id}`,
      {
        requesting_user_id: user._id,
      }
    )
    setShow(!show)
    console.log(data)
  }
  return (
    <>
      {show && (
        <Card>
          <Card.Img variant='top' src={profilePic} />
          <Card.Body>
            <Card.Title>{user.username}</Card.Title>
            <Card.Text>
              {user.first_name} {user.last_name}{' '}
            </Card.Text>
            <Card.Text>
              <Button onClick={unblockButtonHandler}>Unblock</Button>
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  )
}

const BlockedUsersScreen = () => {
  const { userInfo } = useSelector((state) => state.userLogin)
  const { blockedInfo } = useSelector((state) => state.usersBlocked)
  return (
    <>
      <h1>Blocked Users</h1>
      <CardColumns>
        {blockedInfo &&
          blockedInfo.length > 0 &&
          blockedInfo.map((el) => (
            <BlockedUser user={el} key={el._id} userInfo={userInfo} />
          ))}
      </CardColumns>
    </>
  )
}

export default BlockedUsersScreen
