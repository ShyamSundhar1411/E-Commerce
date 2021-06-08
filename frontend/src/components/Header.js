import React from 'react'
import { Nav,Navbar,Container,Row } from 'react-bootstrap'

function Header() {
  return (
    <header>
    <Navbar bg="dark"  variant = "dark" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand href="#home">PROSHOP</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="/Cart"><i className = "fas fa-shopping-cart"></i>Cart</Nav.Link>
            <Nav.Link href="/Login"><i className = "fas fa-user"></i>Login</Nav.Link>
            </Nav>
            </Navbar.Collapse>
          </Container>
      </Navbar>
    </header>
  )
}

export default Header
