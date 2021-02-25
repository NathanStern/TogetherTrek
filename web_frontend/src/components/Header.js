import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap'
const Header = () => {
    return (
        <header>
            <Navbar bg="primary" expand="lg">
                <Container>
                    <LinkContainer to='./'>
                        <Navbar.Brand>TogetherTrek</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to="./login">
                                <Nav.Link >Login</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='./register'>
                                <Nav.Link>Register</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
