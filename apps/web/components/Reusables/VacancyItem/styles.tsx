import styled from "@emotion/styled";
import Link from "next/link";

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

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ProfessionTitle = styled.div<{ isLink: boolean }>`
  color: ${({ theme, isLink }) =>
    isLink ? theme.colors.blue[4] : theme.colors.grey[6]};
  font-size: ${FONTS.sizes.xl}px;
  font-weight: ${FONTS.weights.semiBold};
`;

export const FavoriteButton = styled.div`
  pointer-events: auto;
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

export const WrapperLink = styled(Link)<{ isLink: boolean }>`
  width: 100%;
  pointer-events: ${({ isLink }) => (isLink ? "auto" : "none")};
`;
