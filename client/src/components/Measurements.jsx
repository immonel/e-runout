/* eslint-disable-next-line */
import { Chart as ChartJS } from 'chart.js/auto'
import './Measurements.css'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { socket } from '../socket'
import { baseUrl } from '../config'
import axios from 'axios'
import MeasurementList from './MeasurementList'
import Chart from './Chart'

const path = `${baseUrl}/api/measurements`

const Measurements = ({ connectionStatus }) => {
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
      /* Add electrical runout */
      processedMeasurement.datasets.push({
        name: 'Electrical runout',
        coefficient: 1,
        data: processedMeasurement.datasets[0].data.map((dataPoint, i) => (
          Math.abs(dataPoint - processedMeasurement.datasets[1].data[i])
        ))
      })
      return processedMeasurement
    })
  )

  useEffect(() => {
    socket.on('GET_MEASUREMENTS', data => {
      setMeasurements(preprocess(data))
      setSelected(data[0] ? data[0].name : '')
    })

    return () => socket.off('GET_MEASUREMENTS')
  }, [ connectionStatus ])

  return (
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
        onClick={async () => {
          await axios.delete(path)
          setMeasurements([])
        }}
      >
        Clear all measurements
      </Button>
    </div>
  )
}

export default Measurements