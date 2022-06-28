import './Measure.css'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import MeasurementList from '../components/Measure/MeasurementList'
import Chart from '../components/Measure/MeasurementChart'
import DeviceStatus from '../components/DeviceStatus'
import MeasurementControls from '../components/Measure/MeasurementControls'
import { useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'

const selectAllMeasurements = state => state.measurements

const filterMeasurements = measurements => 
  measurements.filter(measurement => measurement.type === 'measurement')

const selectMeasurements = createSelector(
  selectAllMeasurements,
  filterMeasurements
)

const Measure = () => {
  const [ selected, setSelected ] = useState('')
  const measurements = useSelector(state => selectMeasurements(state))

  useEffect(() => {
    const selectedIndex = measurements.length - 1
    if (!selected) {
      setSelected(measurements[selectedIndex] ? measurements[selectedIndex].id : '')
    }
  }, [ selected, measurements ])

  return (
    <Row>
      <Col xs={12} md={12} lg={6} className='mb-4'>
        <DeviceStatus />
        <MeasurementControls />
      </Col>
      <Col xs={12} md={12} lg={6}>    
        <h1>Measurements</h1>
        <Chart 
          measurement={measurements.find(measurement => measurement.id === selected)} 
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