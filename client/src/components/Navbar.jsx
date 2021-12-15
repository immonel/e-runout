import React from 'react'
import './Navbar.css'
import { 
  Navbar,
  Container,
  Image
} from 'react-bootstrap'

const _Navbar = () => (
  <Navbar bg="light" expand="lg">
    <Container className='navbar-content'>
      <Navbar.Brand>Electrical runout analyzer</Navbar.Brand>
        <Image width='150px' src='aalto-logo.png' fluid />
    </Container>
  </Navbar>
)

export default _Navbar