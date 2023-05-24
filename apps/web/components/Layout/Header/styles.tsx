import styled from "@emotion/styled";
import Link from "next/link";
import { Header } from "@mantine/core";

import { MEDIA_QUERIES, SIZES } from "@constants";

export const NavHeader = styled(Header)`
  display: grid;
  grid-template-columns: 20vw 80vw;
  align-items: center;

  ${MEDIA_QUERIES.tablet} {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 0 ${SIZES["4xl"]}px;
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${SIZES["12xl"]}px;
  padding-right: 20vw;

  ${MEDIA_QUERIES.tablet} {
    padding: 0;
    gap: ${SIZES["2xl"]}px;
  }
`;

export const LogoLink = styled(Link)`
  justify-self: flex-end;

  ${MEDIA_QUERIES.tablet} {
    justify-self: normal;
  }
`;
