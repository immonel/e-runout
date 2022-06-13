import './Calibrate.css'
import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { socket } from '../../socket'
import MeasurementList from '../MeasurementList'
import Chart from './CalibrationChart'
import DeviceStatus from '../DeviceStatus'
import CalibrationControls from './CalibrationControls'
import { useDispatch, useSelector } from 'react-redux'
import { updateCalibrations } from '../../reducers/calibrationReducer'

const Calibrate = ({ elapsedTime }) => {
  const [ selected, setSelected ] = useState('')
  const calibrations = useSelector(state => state.calibrations)
  const dispatch = useDispatch()

  useEffect(() => {
    socket.on('GET_MEASUREMENTS', data => {
      dispatch(updateCalibrations(data))
      setSelected(data[0] ? data[0].name : '')
    })

    return () => socket.off('GET_MEASUREMENTS')
  }, [ dispatch ])

  return (
    <Row>
      <Col xs={12} md={12} lg={6}>
        <DeviceStatus elapsedTime={elapsedTime} />
        <CalibrationControls />
      </Col>
      <Col xs={12} md={12} lg={6}>     
        <div>
          <h1>Calibrations</h1>
          <Chart 
            measurement={calibrations.find(measurement => measurement.name === selected)} 
          />
          <MeasurementList 
            measurements={calibrations} 
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

export default Calibrate