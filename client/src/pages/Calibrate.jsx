import './Calibrate.css'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Chart from '../components/Calibrate/CalibrationChart'
import DeviceStatus from '../components/DeviceStatus'
import CalibrationControls from '../components/Calibrate/CalibrationControls'
import { useSelector } from 'react-redux'
import CalibrationList from '../components/Calibrate/CalibrationList'

const Calibrate = () => {
  const [ selected, setSelected ] = useState('')
  const calibrations = useSelector(state => 
    state.measurements.filter(measurement => measurement.type === 'calibration')
  )

  useEffect(() => {
    const selectedIndex = calibrations.length - 1
    setSelected(calibrations[selectedIndex] ? calibrations[selectedIndex].name : '')
  }, [ ])

  return (
    <Row>
      <Col xs={12} md={12} lg={6}>
        <DeviceStatus />
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