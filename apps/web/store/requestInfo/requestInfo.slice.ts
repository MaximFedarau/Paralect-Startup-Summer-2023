import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  isRequestProcessing: boolean;
  isRequestError: boolean;
}

const initialState: InitialState = {
  isRequestProcessing: true,
  isRequestError: false,
};

export const requestInfoSlice = createSlice({
  name: "requestInfoSlice",
  initialState,
  reducers: {
    setIsRequestProcessing: (state, { payload }: PayloadAction<boolean>) => {
      state.isRequestProcessing = payload;
    },
    setIsRequestError: (state, { payload }: PayloadAction<boolean>) => {
      state.isRequestError = payload;
    },
  },
});

export const { setIsRequestProcessing, setIsRequestError } =
  requestInfoSlice.actions;
