import { createSlice } from '@reduxjs/toolkit'

const preprocessMeasurement = (measurement) => {
  const regressionCoefficient = measurement.regressionCoefficient
  const scaleFactor = measurement.scaleFactor
  
  /* Transform raw sensor values */
  const processedMeasurement = {
    ...measurement,
    datasets: measurement.datasets.map(dataset => ({
      ...dataset,
      data: dataset.data.map(dataPoint => (
        dataset.type === 'eddy'
          ? dataPoint * scaleFactor * regressionCoefficient
          : dataPoint * scaleFactor
      ))
    }))
  }

  /* Add electrical runout */
  processedMeasurement.datasets.push({
    name: 'Electrical runout',
    type: 'erunout',
    data: processedMeasurement.datasets[0].data.map((ttlDataPoint, i) => {
      const eddyDataPoint = processedMeasurement.datasets[1].data[i]
      return Math.abs(ttlDataPoint - eddyDataPoint)
    })
  })
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
          default:
            return measurement
        }
      })
    }
  }
})

export const { updateMeasurements } = measurementsSlice.actions
export default measurementsSlice.reducer