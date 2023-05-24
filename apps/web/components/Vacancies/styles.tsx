import styled from "@emotion/styled";

import { MEDIA_QUERIES, SIZES } from "@constants";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: calc(
    100vh - ${SIZES["17xl"]}px - 2 * ${SIZES["6xl"]}px
  ); /* minus header height & padding */
  padding: ${SIZES["6xl"]}px 0px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 85%;
  max-width: ${SIZES["396xl"]}px;
  gap: ${SIZES["3xl"]}px;

  ${MEDIA_QUERIES.tablet} {
    flex-direction: column;
    justify-content: start;
  }

  * {
    box-sizing: border-box;
  }
`;
