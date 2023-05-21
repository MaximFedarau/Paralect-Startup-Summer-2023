import styled from "@emotion/styled";

import { FONTS, MEDIA_QUERIES, SIZES } from "@constants";
import {
  createPolymorphicComponent,
  Select,
  SelectProps,
  Button,
  ButtonProps,
} from "@mantine/core";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.grey[0]};
  padding: ${SIZES.xl}px ${SIZES.xl}px;
  height: fit-content;
  border-radius: ${SIZES.md}px;
  width: 100%;
  max-width: ${SIZES["68xl"]}px;
  gap: ${SIZES["2xl"]}px;

  @media only screen and (${MEDIA_QUERIES.tablet}) {
    align-self: center;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DropZone = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.grey[4]};
  font-weight: ${FONTS.weights.medium};
  font-size: ${FONTS.sizes.sm}px;
  cursor: pointer;
`;

export const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SIZES.xl}px;
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SIZES.sm}px;
`;

const _FilterSelect = styled(Select)`
  & .mantine-Select-label {
    font-size: ${FONTS.sizes.lg}px;
    font-weight: ${FONTS.weights.bold};
    margin-bottom: ${SIZES.sm}px;
  }

  & .mantine-Select-input {
    height: ${SIZES["6xl"]}px;
  }

  & .mantine-Select-rightSection {
    pointer-events: none;
  }
`;

export const FilterSelect = createPolymorphicComponent<"div", SelectProps>(
  _FilterSelect
);

export const _SubmitButton = styled(Button)`
  height: ${SIZES["6xl"]}px;
  border-radius: ${SIZES.sm}px;
  background-color: ${({ theme }) => theme.colors.blue[4]};
  font-weight: ${FONTS.weights.regular};
`;

export const SubmitButton = createPolymorphicComponent<"button", ButtonProps>(
  _SubmitButton
);
