// features/weather/weatherSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWeatherByCity, fetchHourlyDailyWeather } from '../../services/weatherService';

interface WeatherState {
  data: object | null;
  hourlyDailyData: object | null;
  loading: boolean;
  error: string | null;
  hourlyDailyError: string | null;
}

const initialState: WeatherState = {
  data: null,
  hourlyDailyData: null,
  loading: false,
  error: null,
  hourlyDailyError: null,
};

export const getWeather = createAsyncThunk<object, string>(
  'weather/getWeather',
  async (city, thunkAPI) => {
    try {
      return await fetchWeatherByCity(city);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || 'Error fetching weather');
    }
  }
);

export const getHourlyDailyWeather = createAsyncThunk<object, string>(
  'weather/getHourlyDailyWeather',
  async (city, thunkAPI) => {
    try {
      return await fetchHourlyDailyWeather(city);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || 'Error fetching weather');
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearState: (state) => {
      state.data = null;
      state.hourlyDailyData = null;
      state.loading = false;
      state.error = null;
      state.hourlyDailyError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetching current weather data
      .addCase(getWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle hourly and daily weather data
      .addCase(getHourlyDailyWeather.pending, (state) => {
        state.loading = true;
        state.hourlyDailyError = null;
      })
      .addCase(getHourlyDailyWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.hourlyDailyData = action.payload;
      })
      .addCase(getHourlyDailyWeather.rejected, (state, action) => {
        state.loading = false;
        state.hourlyDailyError = action.payload as string;
      });
  },
});

export const { clearState } = weatherSlice.actions;

export default weatherSlice.reducer;