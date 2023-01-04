import { configureStore } from '@reduxjs/toolkit';
import RTDBSliceReducer from './slices/RTDBSlice';
const reducer = {
  RTDB: RTDBSliceReducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
