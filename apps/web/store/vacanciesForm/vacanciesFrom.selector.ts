import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@store";

const vacanciesFormSelector = ({ vacanciesForm }: RootState) => vacanciesForm;

export const currentSearchBarValueSelector = createSelector(
  [vacanciesFormSelector],
  ({ currentSearchBarValue }) => currentSearchBarValue
);

export const requestSearchBarValueSelector = createSelector(
  [vacanciesFormSelector],
  ({ requestSearchBarValue }) => requestSearchBarValue
);

export const currentFiltersSelector = createSelector(
  [vacanciesFormSelector],
  ({ currentCatalogue, currentPaymentFrom, currentPaymentTo }) => ({
    currentCatalogue,
    currentPaymentFrom,
    currentPaymentTo,
  })
);

export const requestFiltersSelector = createSelector(
  [vacanciesFormSelector],
  ({ requestCatalogue, requestPaymentFrom, requestPaymentTo }) => ({
    requestCatalogue,
    requestPaymentFrom,
    requestPaymentTo,
  })
);
