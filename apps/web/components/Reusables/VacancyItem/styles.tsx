import styled from "@emotion/styled";
import { createPolymorphicComponent, Text, TextProps } from "@mantine/core";

import { SIZES, FONTS } from "@constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SIZES.md}px;
  background-color: ${({ theme }) => theme.colors.grey[0]};
  padding: ${SIZES["2xl"]}px;
  border-radius: ${SIZES.md}px;
  width: 100%;
`;

export const ProfessionTitle = styled.div`
  color: ${({ theme }) => theme.colors.blue[4]};
  font-size: ${FONTS.sizes.xl}px;
  font-weight: ${FONTS.weights.semiBold};
`;

export const JobInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${SIZES.md}px;
`;

export const DelimeterContainer = styled.div`
  color: ${({ theme }) => theme.colors.grey[5]};
`;

export const LocationInfoContainer = styled.div`
  display: flex;
  gap: ${SIZES.sm}px;
`;
