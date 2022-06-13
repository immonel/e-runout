import './Calibrate.css'
import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { socket } from '../../socket'
import { baseUrl } from '../../config'
import axios from 'axios'
import MeasurementList from '../MeasurementList'
import Chart from './CalibrationChart'
import DeviceStatus from '../DeviceStatus'
import CalibrationControls from './CalibrationControls'

const path = `${baseUrl}/api/measurements`

const Calibrate = ({ deviceConfig, deviceStatus, elapsedTime, setConfig }) => {
  const [ selected, setSelected ] = useState('')
  const [ measurements, setMeasurements ] = useState([])

  const preprocess = (measurements) => (
    measurements.map(measurement => {
      /* Transform raw sensor values */
      const processedMeasurement = {
        ...measurement,
        datasets: measurement.datasets.map(dataset => ({
          ...dataset,
          data: dataset.data.map(dataPoint => dataPoint * dataset.coefficient)
        }))
      }
      return processedMeasurement
    })
  )

  useEffect(() => {
    socket.on('GET_MEASUREMENTS', data => {
      setMeasurements(preprocess(data))
      setSelected(data[0] ? data[0].name : '')
    })

    return () => socket.off('GET_MEASUREMENTS')
  }, [ deviceStatus.socketConnectionStatus ])

  return (
    <Row>
      <Col xs={12} md={12} lg={6}>
        <DeviceStatus deviceStatus={deviceStatus} elapsedTime={elapsedTime} />
        <CalibrationControls
          deviceConfig={deviceConfig}
          deviceStatus={deviceStatus}
          setConfig={setConfig}
        />
      </Col>
      <Col xs={12} md={12} lg={6}>     
        <div>
          <h1>Calibrations</h1>
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
            onClick={async () => {
              await axios.delete(path)
              setMeasurements([])
            }}
          >
            Clear all measurements
          </Button>
        </div>
      </Col>
    </Row>
  )
}

export default Calibrate