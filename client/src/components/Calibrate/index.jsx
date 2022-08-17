import './Calibrate.css'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import Chart from './CalibrationChart'
import DeviceStatus from '../DeviceStatus'
import CalibrationControls from './CalibrationControls'
import CalibrationStatus from './CalibrationStatus'
import CalibrationList from './CalibrationList'

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
      <Col xs={12} md={12} lg={6} className='mb-4'>
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