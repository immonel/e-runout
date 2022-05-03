import './App.css'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap'
import Navbar from './components/Navbar'
import DeviceStatus from './components/DeviceStatus'
import Measurements from './components/Measurements'
import { socket } from './socket'
import Calibrate from './components/Calibrate/Calibrate'

const App = () => {
  const [ connectionStatus, setConnectionStatus ] = useState('Connecting...')

  useEffect(() => {
    socket.emit("connection")
    socket.on("connect", () => {
      setConnectionStatus('OK')
    })
    socket.on('disconnect', () => {
      setConnectionStatus('Lost connection to server')
    })

    return () => socket.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      <Container className='page-content'>
        <Tabs defaultActiveKey='measure'>
          <Tab eventKey='measure' title='Measure'>
            <Row>
              <Col xs={12} md={12} lg={6}><DeviceStatus connectionStatus={connectionStatus} /></Col>
              <Col xs={12} md={12} lg={6}><Measurements connectionStatus={connectionStatus} /></Col>
            </Row>
          </Tab>
          <Tab eventKey='calibrate' title='Calibrate'>
            <Calibrate />
          </Tab>
        </Tabs>
      </Container>
    </>
  )
}

export default App
