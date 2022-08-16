import React from 'react'
import { Navbar, Container, Image } from 'react-bootstrap'

const _Navbar = () => (
  <Navbar bg="light" expand="lg">
    <Container className='navbar-content'>
      <Navbar.Brand>Electrical runout analyzer</Navbar.Brand>
        {
          process.env.NODE_ENV === 'development' &&
            <p className='my-0 text-secondary'>Development environment</p>
        }
        <Image width='150px' src='aalto-logo.png' fluid />
    </Container>
  </Navbar>
)

export default _Navbar