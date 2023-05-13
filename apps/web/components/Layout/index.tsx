import React, { FC, PropsWithChildren } from "react";
import Image from "next/image";

import LogoWithTitle from "@assets/images/logo_with_title.svg";
import { NavHeader, LinksContainer, LogoLink } from "./styles";
import { SIZES } from "@constants";
import { HighlightedLink } from "./HighlightedLink";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <NavHeader height={SIZES["17xl"]}>
        <LogoLink href="/">
          <Image src={LogoWithTitle} alt="Logo" width={SIZES["32xl"]} />
        </LogoLink>
        <LinksContainer>
          <HighlightedLink href="/">Поиск вакансий</HighlightedLink>
          <HighlightedLink href="/favorites">Избранное</HighlightedLink>
        </LinksContainer>
      </NavHeader>
      <main>{children}</main>
    </>
  );
};
