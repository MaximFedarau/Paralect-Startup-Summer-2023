import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@store";

const favoritesReducerSelector = ({ favorites }: RootState) => favorites;

export const favoritesSelector = createSelector(
  [favoritesReducerSelector],
  ({ favorites }) => favorites
);
