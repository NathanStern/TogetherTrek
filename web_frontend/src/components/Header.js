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
					<LinkContainer to='./'>
						<Navbar.Brand>TogetherTrek</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					{userInfo ? (
						<NavDropdown
							title={userInfo.username}
							// title={
							// 	<span className='text-primary my-auto'>
							// 		{userInfo.username}
							// 	</span>
							// }
							id='username'
						>
							<LinkContainer to='/profile'>
								<NavDropdown.Item>Profile</NavDropdown.Item>
							</LinkContainer>
							<NavDropdown.Item onClick={logoutHandler}>
								Logout
							</NavDropdown.Item>
						</NavDropdown>
					) : (
						<Navbar.Collapse id='basic-navbar-nav'>
							<Nav className='ml-auto'>
								<LinkContainer to='./login'>
									<Nav.Link>Login</Nav.Link>
								</LinkContainer>
								<LinkContainer to='./register'>
									<Nav.Link>Register</Nav.Link>
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
