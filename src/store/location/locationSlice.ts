// features/weather/locationSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchLocation } from "../../services/weatherService";

interface LocationState {
  locData: object | null;
  locLoading: boolean;
  locError: string | null;
}

const initialState: LocationState = {
  locData: null,
  locLoading: false,
  locError: null,
};

export const getLocation = createAsyncThunk<
  string,
  { lat: string; lon: string }
>("getLocation", async ({ lat, lon }, thunkAPI) => {
  try {
    return await fetchLocation(lat, lon);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error?.response?.data?.message || "Error fetching Location"
    );
  }
});

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    clearState: (state) => {
      state.locData = null;
      state.locLoading = false;
      state.locError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle location fetching
      .addCase(getLocation.pending, (state) => {
        state.locLoading = true;
        state.locError = null;
      })
      .addCase(getLocation.fulfilled, (state, action) => {
        state.locLoading = false;
        state.locData = action.payload;
      })
      .addCase(getLocation.rejected, (state, action) => {
        state.locLoading = false;
        state.locError = action.payload as string;
      });
  },
});

export const { clearState } = locationSlice.actions;

export default locationSlice.reducer;
