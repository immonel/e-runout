import { createSlice } from '@reduxjs/toolkit'

const preprocess = (measurements) => (
  measurements.map(measurement => {
    /* Transform raw sensor values */
    const processedMeasurement = {
      ...measurement,
      datasets: measurement.datasets.map((dataset, i) => ({
        ...dataset,
        data: dataset.data.map(dataPoint => 
          i === 0 ? dataPoint * dataset.coefficient : dataPoint
        )
      }))
    }
    return processedMeasurement
  })
)

const calibrationSlice = createSlice({
  name: 'calibrations',
  initialState: [],
  reducers: {
    updateCalibrations(state, action) {
      return preprocess(action.payload)
    }
  }
})

export const { updateCalibrations } = calibrationSlice.actions
export default calibrationSlice.reducer