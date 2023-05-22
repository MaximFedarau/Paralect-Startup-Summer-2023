import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@store";

const vacanciesFormSelector = ({ vacanciesForm }: RootState) => vacanciesForm;

export const searchBarValueSelector = createSelector(
  [vacanciesFormSelector],
  ({ searchBarValue }) => searchBarValue
);

export const catalogueSelector = createSelector(
  [vacanciesFormSelector],
  ({ catalogue }) => catalogue
);

export const paymentFromSelector = createSelector(
  [vacanciesFormSelector],
  ({ paymentFrom }) => paymentFrom
);

export const paymentToSelector = createSelector(
  [vacanciesFormSelector],
  ({ paymentTo }) => paymentTo
);
