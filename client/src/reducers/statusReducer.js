import { createSlice } from '@reduxjs/toolkit'

const statusSlice = createSlice({
  name: 'status',
  initialState: {},
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