import './Measure.css'
import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import MeasurementList from '../components/Measure/MeasurementList'
import Chart from '../components/Measure/MeasurementChart'
import DeviceStatus from '../components/DeviceStatus'
import MeasurementControls from '../components/Measure/MeasurementControls'
import { useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import MeasurementModal from '../components/Measure/MeasurementModal'
import { BsArrowsAngleExpand } from 'react-icons/bs'
import MeasurementStatus from '../components/Measure/MeasurementStatus'

const selectAllMeasurements = state => state.measurements

const filterMeasurements = measurements => 
  measurements.filter(measurement => measurement.type === 'measurement')

const selectMeasurements = createSelector(
  selectAllMeasurements,
  filterMeasurements
)

const Measure = () => {
  const [ selected, setSelected ] = useState('')
  const [ showMeasurementModal, setShowMeasurementModal ] = useState(false)
  const measurements = useSelector(state => selectMeasurements(state))
  const selectedMeasurement = measurements.find(measurement => measurement.id === selected)

  useEffect(() => {
    const selectedIndex = measurements.length - 1
    if (!selected) {
      setSelected(measurements[selectedIndex] ? measurements[selectedIndex].id : '')
    }
  }, [ selected, measurements ])

  return (
    <>
      <Row>
        <Col xs={12} md={12} lg={6} className='mb-4'>
          <DeviceStatus />
          <MeasurementStatus />
          <MeasurementControls />
        </Col>
        <Col xs={12} md={12} lg={6}>
          <h1>Measurements
            <Button
              variant='outline-secondary'
              onClick={() => setShowMeasurementModal(true)}
              className='modal-button'
            >
              <BsArrowsAngleExpand />
            </Button>
          </h1>
          <Chart 
            measurement={selectedMeasurement} 
          />
          <MeasurementList 
            measurements={measurements} 
            selected={selected}
            setSelected={setSelected}
          />
        </Col>
      </Row>
      {
        selectedMeasurement &&
          <MeasurementModal
            show={showMeasurementModal}
            setShow={setShowMeasurementModal}
            measurement={selectedMeasurement}
          />
      }
    </>
  )
}

export default Measure