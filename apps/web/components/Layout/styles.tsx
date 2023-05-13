import styled from "@emotion/styled";
import Link from "next/link";
import { Header } from "@mantine/core";

export const NavHeader = styled(Header)`
  display: grid;
  grid-template-columns: 20vw 80vw;
  align-items: center;
`;

export const LinksContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 60px;
  padding-right: 20vw;
`;

export const LogoLink = styled(Link)`
  justify-self: flex-end;
`;
