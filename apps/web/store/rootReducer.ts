import { combineReducers } from "@reduxjs/toolkit";

import { vacanciesFormSlice } from "./vacanciesForm";

export const rootReducer = combineReducers({
  vacanciesForm: vacanciesFormSlice.reducer,
});
