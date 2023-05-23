import { combineReducers } from "@reduxjs/toolkit";

import { vacanciesFormSlice } from "./vacanciesForm";
import { favoritesSlice } from "./favorites";

export const rootReducer = combineReducers({
  vacanciesForm: vacanciesFormSlice.reducer,
  favorites: favoritesSlice.reducer,
});
