import { configureStore } from '@reduxjs/toolkit'
import { roomidSlice } from './slices/roomid'

export const store = configureStore({
  reducer: {
    roomid: roomidSlice.reducer,
  },
})