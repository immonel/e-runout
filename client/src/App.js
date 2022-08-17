/* eslint-disable-next-line */
import { Chart as ChartJS } from 'chart.js/auto'
import './App.css'
import React, { useEffect } from 'react'
import { Container, Tab, Tabs } from 'react-bootstrap'
import { socket } from './socket'
import { useDispatch } from 'react-redux'
import { updateStatus } from './reducers/statusReducer'
import { updateConfig } from './reducers/configReducer'
import { updateMeasurements } from './reducers/measurementsReducer'
import Navbar from './components/Navbar'
import Calibrate from './components/Calibrate'
import Measure from './components/Measure'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    socket.emit("connection")
    socket.on("connect", () => {
      dispatch(updateStatus({
        socketConnectionStatus: 'Connected'
      }))
    })

    socket.on('disconnect', reason => {
      dispatch(updateStatus({
        socketConnectionStatus: reason,
        serialConnectionStatus: 'Not available',
        dbConnectionStatus: 'Not connected to server'
      }))
    })

    socket.on('GET_MEASUREMENTS', measurements => {
      dispatch(updateMeasurements(measurements))
    })

    socket.on('GET_CONFIG', config => {
      dispatch(updateConfig(config))
    })

    socket.emit('GET_CONFIG')
    socket.emit('GET_STATUS')

    return () => socket.disconnect()
  }, [ dispatch ])

  return (
    <>
      <Navbar />
      <Container className='page-content'>
        <Tabs defaultActiveKey='measure' className='mb-4'>
          <Tab eventKey='measure' title='Measure'>
            <Measure />
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
