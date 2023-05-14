import React, { FC, useState, useEffect } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { Menu, Burger, useMantineTheme } from "@mantine/core";
import Image from "next/image";

import LogoWithTitle from "@assets/images/logo_with_title.svg";
import Logo from "@assets/images/logo.svg";
import { MEDIA_QUERIES, SIZES } from "@constants";
import { NavHeader, LinksContainer, LogoLink } from "./styles";
import { HighlightedLink } from "@components/Layout/HighlightedLink";

export const Header: FC = () => {
  const { colors } = useMantineTheme();
  const tablet = useMediaQuery(MEDIA_QUERIES.tablet);
  const [openedMenu, setOpenedMenu] = useState(false);

  const onBurgerClick = () => {
    setOpenedMenu(!openedMenu);
  };

  // close menu & burger, if we are not in tablet mode
  useEffect(() => {
    if (!tablet && openedMenu) setOpenedMenu(false);
  }, [tablet, openedMenu]);

  return (
    <NavHeader height={SIZES["17xl"]}>
      <LogoLink href="/">
        <Image
          src={tablet ? Logo : LogoWithTitle}
          alt="Logo"
          placeholder="blur"
          blurDataURL={
            tablet
              ? "@assets/images/logo.svg"
              : "@assets/images/logo_with_title.svg"
          }
          width={tablet ? SIZES["6xl"] : SIZES["32xl"]}
        />
      </LogoLink>
      <LinksContainer>
        {tablet ? (
          <Menu
            shadow="md"
            width={SIZES["48xl"]}
            opened={openedMenu}
            onChange={onBurgerClick}
            position="bottom-end"
          >
            <Menu.Target>
              <Burger opened={openedMenu} color={colors.grey[6]} />
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item>
                <HighlightedLink href="/">Поиск вакансий</HighlightedLink>
              </Menu.Item>
              <Menu.Item>
                <HighlightedLink href="/favorites">Избранное</HighlightedLink>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <>
            <HighlightedLink href="/">Поиск вакансий</HighlightedLink>
            <HighlightedLink href="/favorites">Избранное</HighlightedLink>
          </>
        )}
      </LinksContainer>
    </NavHeader>
  );
};
