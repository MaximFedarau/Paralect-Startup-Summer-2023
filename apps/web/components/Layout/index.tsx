import React, { FC, PropsWithChildren } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header, Text } from "@mantine/core";

import LogoWithTitle from "@assets/images/logo_with_title.svg";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const LOGO_SIZE = 144;
  return (
    <>
      <Header
        height={84}
        sx={{
          display: "grid",
          gridTemplateColumns: "20vw 80vw",
          alignItems: "center",
        }}
      >
        <Link href="/" style={{ justifySelf: "flex-end" }}>
          <Image src={LogoWithTitle} alt="Logo" width={LOGO_SIZE} />
        </Link>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 60,
            paddingRight: "20vw",
          }}
        >
          <Link href="/">
            <Text color="black">Поиск вакансий</Text>
          </Link>
          <Link href="/favorites">
            <Text color="black">Избранное</Text>
          </Link>
        </div>
      </Header>
      <main>{children}</main>
    </>
  );
};
