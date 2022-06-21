import './Measure.css'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { socket } from '../socket'
import MeasurementList from '../components/Measure/MeasurementList'
import Chart from '../components/Measure/MeasurementChart'
import DeviceStatus from '../components/DeviceStatus'
import MeasurementControls from '../components/Measure/MeasurementControls'
import { updateMeasurements } from '../reducers/measurementsReducer'
import { useDispatch, useSelector } from 'react-redux'

const Measure = () => {
  const [ selected, setSelected ] = useState('')
  const measurements = useSelector(state => state.measurements)
  const dispatch = useDispatch()

  useEffect(() => {
    socket.on('GET_MEASUREMENTS', data => {
      dispatch(updateMeasurements(data))
      setSelected(data[0] ? data[0].name : '')
    })

    return () => socket.off('GET_MEASUREMENTS')
  }, [ dispatch ])

  return (
    <Row>
      <Col xs={12} md={12} lg={6}>
        <DeviceStatus />
        <MeasurementControls />
      </Col>
      <Col xs={12} md={12} lg={6}>    
        <h1>Measurements</h1>
        <Chart 
          measurement={measurements.find(measurement => measurement.name === selected)} 
        />
        <MeasurementList 
          measurements={measurements} 
          selected={selected}
          setSelected={setSelected}
        />
      </Col>
    </Row>
  )
}

export default Measure