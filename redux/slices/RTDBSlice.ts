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
      state.memes = [...state.memes, payload];
    },
    updateMemesLikes(state, { payload }) {
      state.memes = [
        ...state.memes.map((item) => {
          if (item.meme == payload.meme) {
            return { ...item, likes: payload.likes };
          } else return item;
        }),
      ];
    },
  },
});

export const { setMessages, setMemes, updateMemesLikes } = RTDBSlice.actions;
export default RTDBSlice.reducer;
