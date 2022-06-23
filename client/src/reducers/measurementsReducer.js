import { createSlice } from '@reduxjs/toolkit'

const preprocessMeasurement = (measurement) => {
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
}

const preprocessCalibration = (calibration) => {
  /* Transform raw sensor values */
  const processedMeasurement = {
    ...calibration,
    datasets: calibration.datasets.map((dataset, i) => ({
      ...dataset,
      data: dataset.data.map(dataPoint => 
        i === 0 ? dataPoint * dataset.coefficient : dataPoint
      )
    }))
  }
  return processedMeasurement
}

const measurementsSlice = createSlice({
  name: 'measurements',
  initialState: [],
  reducers: {
    updateMeasurements(state, action) {
      return action.payload.map(measurement => {
        switch (measurement.type) {
          case 'measurement':
            return preprocessMeasurement(measurement)
          case 'calibration':
            return preprocessCalibration(measurement)
          default:
            return measurement
        }
      })
    }
  }
})

export const { updateMeasurements } = measurementsSlice.actions
export default measurementsSlice.reducer