import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
const Header = () => {
    return (
        <header>
            <Navbar bg="secondary" expand="lg">
                <Container>
                    <Navbar.Brand href="./">TogetherTrek</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="./login">Login</Nav.Link>
                            <Nav.Link href="./register">Register</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
