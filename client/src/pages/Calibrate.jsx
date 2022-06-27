import './Calibrate.css'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Chart from '../components/Calibrate/CalibrationChart'
import DeviceStatus from '../components/DeviceStatus'
import CalibrationControls from '../components/Calibrate/CalibrationControls'
import { useSelector } from 'react-redux'
import CalibrationStatus from '../components/Calibrate/CalibrationStatus'
import CalibrationList from '../components/Calibrate/CalibrationList'
import { createSelector } from '@reduxjs/toolkit'

const selectAllMeasurements = state => state.measurements

const filterCalibrations = measurements => 
  measurements.filter(measurement => measurement.type === 'calibration')

const selectCalibrations = createSelector(
  selectAllMeasurements,
  filterCalibrations
)

const Calibrate = () => {
  const [ selected, setSelected ] = useState('')
  const calibrations = useSelector(state => selectCalibrations(state))

  useEffect(() => {
    const selectedIndex = calibrations.length - 1
    if (!selected) {
      setSelected(calibrations[selectedIndex] ? calibrations[selectedIndex].id : '')
    }
  }, [ calibrations, selected ])

  return (
    <Row>
      <Col xs={12} md={12} lg={6}>
        <DeviceStatus />
        <CalibrationStatus />
        <CalibrationControls selectedCalibration={selected} />
      </Col>
      <Col xs={12} md={12} lg={6}>     
        <h1>Calibrations</h1>
        <Chart 
          measurement={calibrations.find(measurement => measurement.id === selected)} 
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