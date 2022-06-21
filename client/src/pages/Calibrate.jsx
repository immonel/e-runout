import './Calibrate.css'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { socket } from '../socket'
import Chart from '../components/Calibrate/CalibrationChart'
import DeviceStatus from '../components/DeviceStatus'
import CalibrationControls from '../components/Calibrate/CalibrationControls'
import { useDispatch, useSelector } from 'react-redux'
import { updateCalibrations } from '../reducers/calibrationReducer'
import CalibrationList from '../components/Calibrate/CalibrationList'

const Calibrate = ({ elapsedTime }) => {
  const [ selected, setSelected ] = useState('')
  const calibrations = useSelector(state => state.calibrations)
  const dispatch = useDispatch()

  useEffect(() => {
    socket.on('GET_CALIBRATIONS', data => {
      dispatch(updateCalibrations(data))
      setSelected(data[0] ? data[0].name : '')
    })

    return () => socket.off('GET_CALIBRATIONS')
  }, [ dispatch ])

  return (
    <Row>
      <Col xs={12} md={12} lg={6}>
        <DeviceStatus elapsedTime={elapsedTime} />
        <CalibrationControls selectedCalibration={selected} />
      </Col>
      <Col xs={12} md={12} lg={6}>     
        <h1>Calibrations</h1>
        <Chart 
          measurement={calibrations.find(measurement => measurement.name === selected)} 
        />
        <CalibrationList 
          calibrations={calibrations} 
          selected={selected}
          setSelected={setSelected}
        />
      </Col>
    </Row>
  )
}

export default Calibrate