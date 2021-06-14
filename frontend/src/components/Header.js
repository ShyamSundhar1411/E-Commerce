import React from 'react'
import { Nav,Navbar,Container,Row,NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import {logout} from '../actions/userAction'

function Header() {
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin
  const dispatch = useDispatch()
  const logouthandler = () => {
    dispatch(logout())
  }
  return (
    <header>
    <Navbar bg="dark"  variant = "dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to = '/'>
          <Navbar.Brand >PROSHOP</Navbar.Brand>
        </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <LinkContainer to = '/cart'>
                  <Nav.Link><i className = "fas fa-shopping-cart"></i>Cart</Nav.Link>
                </LinkContainer>
                {userInfo ? (
                  <NavDropdown title = {userInfo.name} id = "username">
                    <LinkContainer to = '/profile'>
                      <NavDropdown.Item>
                        Profile
                      </NavDropdown.Item>
                    </LinkContainer>
                    {userInfo.isAdmin &&
                      <LinkContainer to = '/admin/users'>
                        <NavDropdown.Item>
                          Users
                        </NavDropdown.Item>
                      </LinkContainer>
                    }
                    <NavDropdown.Item onClick = {logouthandler}>Logout</NavDropdown.Item>
                  </NavDropdown>

                ): <LinkContainer to = '/login'>
                  <Nav.Link ><i className = "fas fa-user"></i>Login</Nav.Link>
                </LinkContainer>}
            </Nav>
            </Navbar.Collapse>
          </Container>
      </Navbar>
    </header>
  )
}

export default Header
