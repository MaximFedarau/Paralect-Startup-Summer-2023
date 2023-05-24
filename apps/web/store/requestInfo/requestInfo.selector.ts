import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@store";

const requestInfoSelector = ({ requestInfo }: RootState) => requestInfo;

export const isRequestProcessingSelector = createSelector(
  [requestInfoSelector],
  ({ isRequestProcessing }) => isRequestProcessing
);

export const isRequestErrorSelector = createSelector(
  [requestInfoSelector],
  ({ isRequestError }) => isRequestError
);
