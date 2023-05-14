import styled from "@emotion/styled";
import Link from "next/link";
import { Header } from "@mantine/core";

import { MEDIA_QUERIES, SIZES } from "@constants";

export const NavHeader = styled(Header)`
  display: grid;
  grid-template-columns: 20vw 80vw;
  align-items: center;

  @media only screen and (${MEDIA_QUERIES.tablet}) {
    display: flex;
    justify-content: space-between;
    padding: 0 ${SIZES["4xl"]}px;
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${SIZES["12xl"]}px;
  padding-right: 20vw;

  @media only screen and (${MEDIA_QUERIES.tablet}) {
    padding: 0;
    gap: ${SIZES["2xl"]}px;
  }
`;

export const LogoLink = styled(Link)`
  justify-self: flex-end;

  @media only screen and (${MEDIA_QUERIES.tablet}) {
    justify-self: normal;
  }
`;
