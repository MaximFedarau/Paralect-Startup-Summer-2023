import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Filters {
  requestCatalogue: string;
  currentCatalogue: string;
  requestPaymentFrom: string;
  currentPaymentFrom: string;
  requestPaymentTo: string;
  currentPaymentTo: string;
}

interface PayloadFilters {
  catalogue: string;
  paymentFrom: string;
  paymentTo: string;
}

interface InitialState extends Filters {
  requestSearchBarValue: string;
  currentSearchBarValue: string;
}

interface PayloadState extends PayloadFilters {
  searchBarValue: string;
}

const initialState: InitialState = {
  requestSearchBarValue: "",
  currentSearchBarValue: "",
  requestCatalogue: "",
  currentCatalogue: "",
  requestPaymentFrom: "",
  currentPaymentFrom: "",
  requestPaymentTo: "",
  currentPaymentTo: "",
};

export const vacanciesFormSlice = createSlice({
  name: "vacanciesFormSlice",
  initialState,
  reducers: {
    setRequestSearchBarValue: (state, { payload }: PayloadAction<string>) => {
      state.requestSearchBarValue = payload;
    },
    setCurrentSearchBarValue: (state, { payload }: PayloadAction<string>) => {
      state.currentSearchBarValue = payload;
    },
    setRequestFilters: (state, { payload }: PayloadAction<PayloadFilters>) => {
      state.requestCatalogue = payload.catalogue;
      state.requestPaymentFrom = payload.paymentFrom;
      state.requestPaymentTo = payload.paymentTo;
    },
    setRequestState: (state, { payload }: PayloadAction<PayloadState>) => {
      state.requestSearchBarValue = payload.searchBarValue;
      state.requestCatalogue = payload.catalogue;
      state.requestPaymentFrom = payload.paymentFrom;
      state.requestPaymentTo = payload.paymentTo;
    },
    setCurrentFilters: (state, { payload }: PayloadAction<PayloadFilters>) => {
      state.currentCatalogue = payload.catalogue;
      state.currentPaymentFrom = payload.paymentFrom;
      state.currentPaymentTo = payload.paymentTo;
    },
    setCurrentCatalogue: (state, { payload }: PayloadAction<string>) => {
      state.currentCatalogue = payload;
    },
    setCurrentPaymentFrom: (state, { payload }: PayloadAction<string>) => {
      state.currentPaymentFrom = payload;
    },
    setCurrentPaymentTo: (state, { payload }: PayloadAction<string>) => {
      state.currentPaymentTo = payload;
    },
  },
});

export const {
  setCurrentSearchBarValue,
  setRequestSearchBarValue,
  setCurrentFilters,
  setCurrentCatalogue,
  setCurrentPaymentFrom,
  setCurrentPaymentTo,
  setRequestFilters,
  setRequestState,
} = vacanciesFormSlice.actions;
