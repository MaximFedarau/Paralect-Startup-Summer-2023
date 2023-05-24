import { combineReducers } from "@reduxjs/toolkit";

import { vacanciesFormSlice } from "./vacanciesForm";
import { favoritesSlice } from "./favorites";
import { requestInfoSlice } from "./requestInfo";

export const rootReducer = combineReducers({
  vacanciesForm: vacanciesFormSlice.reducer,
  favorites: favoritesSlice.reducer,
  requestInfo: requestInfoSlice.reducer,
});
