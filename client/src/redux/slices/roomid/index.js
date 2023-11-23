import { createSlice } from '@reduxjs/toolkit'

export const roomidSlice = createSlice({
    initialState: null,
    name: 'roomid',
    reducers: {
        setID: (state,action)=>{
            // state = action.payload+1;
            return action.payload;
        }
    }
});

export const { setID } = roomidSlice.actions;
// export default roomidSlice.reducer;