import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './theme/themeSlice';
import weatherReducer from './weather/weatherSlice';
import locationReducer from './location/locationSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    weather: weatherReducer,
    location: locationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;