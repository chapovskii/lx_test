import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import getRecords from "../features/flats/get";
import callUpdate from "../features/flats/update"


export const store = configureStore({
  reducer: {
    fetchedRecords: getRecords,
    updateStatus: callUpdate,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
