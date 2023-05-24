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
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProfessionTitle = styled.div<{ isLink: boolean }>`
  color: ${({ theme, isLink }) =>
    isLink ? theme.colors.blue[4] : theme.colors.grey[6]};
  font-size: ${FONTS.sizes.xl}px;
  font-weight: ${FONTS.weights.semiBold};
`;

export const FavoriteButton = styled.div<{
  isLink: boolean;
  isFavorite: boolean;
}>`
  pointer-events: ${({ isLink }) => (isLink ? "auto" : "none")};
  width: ${SIZES["2xl"]}px;
  height: ${SIZES["2xl"]}px;
  color: ${({ theme, isFavorite }) =>
    isFavorite ? theme.colors.blue[4] : theme.colors.grey[4]};

  :hover {
    color: ${({ theme }) => theme.colors.blue[4]};
  }
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

  svg {
    width: ${SIZES.xl}px;
    height: ${SIZES.xl}px;
    color: ${({ theme }) => theme.colors.grey[4]};
  }
`;
