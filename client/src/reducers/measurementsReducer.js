import { createSlice } from '@reduxjs/toolkit'

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

const measurementsSlice = createSlice({
  name: 'measurements',
  initialState: [],
  reducers: {
    updateMeasurements(state, action) {
      return preprocess(action.payload)
    }
  }
})

export const { updateMeasurements } = measurementsSlice.actions
export default measurementsSlice.reducer