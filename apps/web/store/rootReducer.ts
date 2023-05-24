import { combineReducers } from "@reduxjs/toolkit";

import { REDUCERS_NAMES } from "@constants";
import { vacanciesFormSlice } from "./vacanciesForm";
import { favoritesSlice } from "./favorites";
import { requestInfoSlice } from "./requestInfo";

export const rootReducer = combineReducers({
  [REDUCERS_NAMES.VACANCIES_FORM]: vacanciesFormSlice.reducer,
  [REDUCERS_NAMES.FAVORITES]: favoritesSlice.reducer,
  [REDUCERS_NAMES.REQUEST_INFO]: requestInfoSlice.reducer,
});
