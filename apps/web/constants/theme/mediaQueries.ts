import { DEVICE_SIZES } from "./sizes";

export const MEDIA_QUERIES = {
  mobile: `@media only screen and (max-width: ${DEVICE_SIZES.mobile}px)`,
  mobleQuery: `(max-width: ${DEVICE_SIZES.mobile}px)`,
  tablet: `@media only screen and (max-width: ${DEVICE_SIZES.tablet}px)`,
  tabletQuery: `(max-width: ${DEVICE_SIZES.tablet}px)`,
};
