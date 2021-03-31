import '../index.css'
import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const logoutHandler = (e) => {
    dispatch(logout())
  }
  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='lg' id='navbarColor01'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>TogetherTrek</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          {userInfo ? (
            <>
              <Nav className='ml-auto'>
                <LinkContainer to='/friends'>
                  <Nav.Link>
                    <span class='white-text'>Friends</span>
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/posts'>
                  <Nav.Link>
                    <span class='white-text'>Posts</span>
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/createpost'>
                  <Nav.Link>
                    <span class='white-text'>New Post</span>
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/createtrip'>
                  <Nav.Link>
                    <span class='white-text'>New Trip</span>
                  </Nav.Link>
                </LinkContainer>
                {(userInfo.friend_requests.length > 0 ||
                  userInfo.trip_requests.length > 0) && (
                  <LinkContainer to='/notifications'>
                    <Nav.Link>
                      <span class='white-text'>Notifications</span>
                    </Nav.Link>
                  </LinkContainer>
                )}
                {userInfo.message_board_ids.length > 0 && (
                  <LinkContainer to='/messages'>
                    <Nav.Link>
                      <span class='white-text'>MessageBoards</span>
                    </Nav.Link>
                  </LinkContainer>
                )}
              </Nav>
              <NavDropdown
                title={userInfo.username}
                // title={
                // 	<span className='text-primary my-auto'>
                // 		{userInfo.username}
                // 	</span>
                // }<
                id='nav-dropdown'
              >
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                {/* <LinkContainer to='/post'>

									<NavDropdown.Item>New Post</NavDropdown.Item>
								</LinkContainer> */}
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='ml-auto'>
                <LinkContainer to='./login'>
                  <Nav.Link>Sign In</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
