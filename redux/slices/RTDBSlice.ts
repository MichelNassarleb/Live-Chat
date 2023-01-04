import { createSlice } from '@reduxjs/toolkit';
import { RTDBSliceInterface } from '../../config/interfaces';

const initialState: RTDBSliceInterface = {
  messages: [],
  memes: [],
};
const RTDBSlice = createSlice({
  name: 'RTDB',
  initialState,
  reducers: {
    setMessages(state: any, { payload }: any) {
      state.messages = [...payload];
    },
    setMemes(state, { payload }) {
      state.memes = [...payload];
    },
  },
});

export const { setMessages } = RTDBSlice.actions;
export default RTDBSlice.reducer;
