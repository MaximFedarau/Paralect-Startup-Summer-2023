import styled from "@emotion/styled";
import {
  createPolymorphicComponent,
  Pagination,
  PaginationProps,
} from "@mantine/core";

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

export const LoaderContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  @media only screen and (${MEDIA_QUERIES.tablet}) {
    * {
      align-self: center;
    }
  }
`;

const _VacanciesPagination = styled(Pagination)`
  align-self: center;

  & .mantine-Pagination-control {
    &[data-active] {
      background-color: ${({ theme }) => theme.colors.blue[4]};
    }
  }
`;

export const VacanciesPagination = createPolymorphicComponent<
  "div",
  PaginationProps
>(_VacanciesPagination);
