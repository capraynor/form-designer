import { configureStore } from '@reduxjs/toolkit';
import { designSurfaceReducer } from './features/designSurfaceSlice';

const store = configureStore({
  reducer: {
    designSurface: designSurfaceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;