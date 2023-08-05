import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export type Record = {
  id: number;
  title: string;
  img_url: string;
  note: string;

};
type InitialState = {
  totalCount: number;
  loading: boolean;
  records: Record[];
  error: string;
};
const initialState: InitialState = {
  loading: false,
  records: [],
  error: "",
  totalCount: 0
};

// Generates pending, fulfilled and rejected action types
export const fetchRecords = createAsyncThunk(
  "record/fetchRecords",
  async () => {
    const response = await axios.get(
      // `http://localhost:3001`,
      `http://localhost:3001?_page=${1}&_limit=20`,
    );
    console.log(response.data)
    return response.data;
  }
);

const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRecords.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchRecords.fulfilled,
      (state, action: PayloadAction<Record[]>) => {
        state.loading = false;
        state.records = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchRecords.rejected, (state, action) => {
      state.loading = false;
      state.records = [];
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default recordSlice.reducer;


