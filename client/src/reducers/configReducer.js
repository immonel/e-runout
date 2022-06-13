import { createSlice } from '@reduxjs/toolkit'
import { socket } from '../socket'

const configSlice = createSlice({
  name: 'config',
  initialState: {},
  reducers: {
    updateConfig(state, action) {
      return action.payload
    },
    setConfig(state, action) {
      const newConfig = {
        ...state,
        ...action.payload
      }
      socket.emit('SET_CONFIG', newConfig)
      return newConfig
    }
  }
})

export const { updateConfig, setConfig } = configSlice.actions
export default configSlice.reducer