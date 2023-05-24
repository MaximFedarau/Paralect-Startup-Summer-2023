import styled from "@emotion/styled";
import {
  createPolymorphicComponent,
  Text,
  TextProps,
  Button,
  ButtonProps,
  Loader,
  LoaderProps,
  Pagination,
  PaginationProps,
} from "@mantine/core";

import { FONTS, SIZES, MEDIA_QUERIES } from "@constants";

const _DefaultText = styled(Text)`
  color: ${({ theme }) => theme.colors.grey[6]};
`;

export const DefaultText = createPolymorphicComponent<"div", TextProps>(
  _DefaultText
);

const _SemiBoldText = styled(DefaultText)`
  font-weight: ${FONTS.weights.semiBold};
`;
export const SemiBoldText = createPolymorphicComponent<"div", TextProps>(
  _SemiBoldText
);

const _LargeText = styled(DefaultText)`
  font-size: ${FONTS.sizes.xl}px;
  font-weight: ${FONTS.weights.bold};
`;

export const LargeText = createPolymorphicComponent<"div", TextProps>(
  _LargeText
);

const _BaseMText = styled(DefaultText)`
  font-size: ${FONTS.sizes.lg}px;
  font-weight: ${FONTS.weights.bold};
`;

export const BaseMText = createPolymorphicComponent<"div", TextProps>(
  _BaseMText
);

export const _DarkBlueButton = styled(Button)`
  height: ${SIZES["6xl"]}px;
  border-radius: ${SIZES.sm}px;
  background-color: ${({ theme }) => theme.colors.blue[4]};
  font-weight: ${FONTS.weights.regular};

  :hover {
    background-color: ${({ theme }) => theme.colors.blue[3]};
  }

  :active {
    background-color: ${({ theme }) => theme.colors.blue[5]};
  }
`;

export const DarkBlueButton = createPolymorphicComponent<"button", ButtonProps>(
  _DarkBlueButton
);

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

const _CustomLoader = styled(Loader)`
  align-self: center;
  stroke: ${({ theme }) => theme.colors.blue[4]};
`;

export const CustomLoader = createPolymorphicComponent<"div", LoaderProps>(
  _CustomLoader
);

export const VacancyContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: ${SIZES["2xl"]}px 0;

  * {
    box-sizing: border-box;
  }
`;

export const VacancyContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  gap: ${SIZES.xl}px;
`;

export const VacancyDescription = styled.div`
  width: 100%;
  background-color: white;
  padding: ${SIZES["2xl"]}px;
  border-radius: ${SIZES.md}px;
  overflow: scroll;
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

export * from "./VacancyItem";
