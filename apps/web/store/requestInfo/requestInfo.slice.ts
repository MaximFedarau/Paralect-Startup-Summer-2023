import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  isRequestProcessing: boolean;
  isRequestError: boolean;
  activePage: number;
}

const initialState: InitialState = {
  isRequestProcessing: true,
  isRequestError: false,
  activePage: 1,
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
    setActivePage: (state, { payload }: PayloadAction<number>) => {
      state.activePage = payload;
    },
  },
});

export const { setIsRequestProcessing, setIsRequestError, setActivePage } =
  requestInfoSlice.actions;
