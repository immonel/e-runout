/* eslint-disable-next-line */
import { Chart as ChartJS } from 'chart.js/auto'
import './App.css'
import React, { useEffect, useState } from 'react'
import { Container, Tab, Tabs } from 'react-bootstrap'
import Navbar from './components/Navbar'
import { socket } from './socket'
import Calibrate from './components/Calibrate/Calibrate'
import Measure from './components/Measure/Measure'

const App = () => {
  const [ socketConnectionStatus, setSocketConnectionStatus ] = useState('Connecting...')
  const [ deviceStatus, setDeviceStatus ] = useState({
    serialConnectionStatus: 'Not available',
    serialPath: '',
    running: false,
    dataPoints: 0,
    sampleSpeed: 0
  })
  const [ deviceConfig, setDeviceConfig ] = useState({})
  const [ startTime, setStartTime ] = useState(0)
  const elapsedTime = new Date(Date.now() - startTime)

  const setConfig = (config) => {
    setDeviceConfig(config)
    socket.emit('SET_CONFIG', config)
  }

  useEffect(() => {
    socket.emit("connection")
    socket.on("connect", () => {
      setSocketConnectionStatus('OK')
    })
    socket.on('disconnect', reason => {
      setSocketConnectionStatus(reason)
      setDeviceStatus({
        ...deviceStatus,
        serialConnectionStatus: 'Not available'
      })
    })

    socket.on('GET_STATUS', status => {
      setDeviceStatus({
        ...deviceStatus,
        ...status
      })
    })

    socket.on('GET_CONFIG', config => {
      setDeviceConfig(config)
    })

    socket.emit('GET_CONFIG')
    socket.emit('GET_STATUS')

    return () => socket.disconnect()
  }, [ ])

  return (
    <>
      <Navbar />
      <Container className='page-content'>
        <Tabs defaultActiveKey='measure' className='mb-4'>
          <Tab eventKey='measure' title='Measure'>
            <Measure
              deviceStatus={{...deviceStatus, socketConnectionStatus}}
              deviceConfig={deviceConfig}
              setConfig={setConfig}
              elapsedTime={elapsedTime}
            />
          </Tab>
          <Tab eventKey='calibrate' title='Calibrate'>
            <Calibrate
              deviceStatus={{...deviceStatus, socketConnectionStatus}}
              deviceConfig={deviceConfig}
              setConfig={setConfig}
              elapsedTime={elapsedTime}
            />
          </Tab>
        </Tabs>
      </Container>
    </>
  )
}

export default App
