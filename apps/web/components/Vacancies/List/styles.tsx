import styled from "@emotion/styled";

import { MEDIA_QUERIES, SIZES } from "@constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${SIZES.lg}px;

  ${MEDIA_QUERIES.tablet} {
    * {
      align-self: center;
    }
  }
`;

export const LoaderContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  ${MEDIA_QUERIES.tablet} {
    * {
      align-self: center;
    }
  }
`;
