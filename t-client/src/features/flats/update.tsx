import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  loading: boolean;
  records: boolean;
  error: string;
};
const initialState: InitialState = {
  loading: false,
  records: false,
  error: "",
};

// Generates pending, fulfilled and rejected action types
export const callUpdate = createAsyncThunk("record/callUpdate", async () => {
  const response = await axios.post(`http://localhost:3001/flats/`);
  return response.data;
});

const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(callUpdate.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      callUpdate.fulfilled,
      (state, action: PayloadAction<boolean>) => {
        state.loading = false;
        state.records = action.payload;
        state.error = "";
      }
    );
    builder.addCase(callUpdate.rejected, (state, action) => {
      state.loading = false;
      state.records = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default recordSlice.reducer;
