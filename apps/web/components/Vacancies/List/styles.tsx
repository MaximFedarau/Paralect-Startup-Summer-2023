import styled from "@emotion/styled";

import { MEDIA_QUERIES, SIZES } from "@constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${SIZES.lg}px;

  @media only screen and (${MEDIA_QUERIES.tablet}) {
    * {
      align-self: center;
    }
  }
`;