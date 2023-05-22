import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Filters {
  catalogue: string;
  paymentFrom: string;
  paymentTo: string;
}

interface InitialState extends Filters {
  searchBarValue: string;
}

const initialState: InitialState = {
  searchBarValue: "",
  catalogue: "",
  paymentFrom: "",
  paymentTo: "",
};

export const vacanciesFormSlice = createSlice({
  name: "vacanciesFormSlice",
  initialState,
  reducers: {
    setSearchBarValue: (state, { payload }: PayloadAction<string>) => {
      state.searchBarValue = payload;
    },
    setFilters: (state, { payload }: PayloadAction<Filters>) => {
      state.catalogue = payload.catalogue;
      state.paymentFrom = payload.paymentFrom;
      state.paymentTo = payload.paymentTo;
    },
  },
});

export const { setFilters, setSearchBarValue } = vacanciesFormSlice.actions;
