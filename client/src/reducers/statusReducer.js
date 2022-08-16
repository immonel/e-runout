import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  socketConnectionStatus: 'Connecting...',
  dbConnectionStatus: 'Connecting...',
  serialConnectionStatus: 'Connecting...',
  serialPath: '',
  running: false,
  dataPoints: 0
}

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    updateStatus(state, action) {
      return {
        ...state,
        ...action.payload
      }
    }
  }
})

export const { updateStatus } = statusSlice.actions
export default statusSlice.reducer