import './Measure.css'
import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { socket } from '../../socket'
import MeasurementList from './MeasurementList'
import Chart from './MeasurementChart'
import DeviceStatus from '../DeviceStatus'
import MeasurementControls from './MeasurementControls'
import { updateMeasurements } from '../../reducers/measurementsReducer'
import { useDispatch, useSelector } from 'react-redux'

const Measure = ({ elapsedTime }) => {
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
        <DeviceStatus elapsedTime={elapsedTime} />
        <MeasurementControls />
      </Col>
      <Col xs={12} md={12} lg={6}>    
        <div>
          <h1>Measurements</h1>
          <Chart 
            measurement={measurements.find(measurement => measurement.name === selected)} 
          />
          <MeasurementList 
            measurements={measurements} 
            selected={selected}
            setSelected={setSelected}
          />
          <Button
            className="erase-button"
            variant="danger"
            onClick={() => socket.emit('DELETE_MEASUREMENTS')}
          >
            Clear all measurements
          </Button>
        </div>
      </Col>
    </Row>
  )
}

export default Measure