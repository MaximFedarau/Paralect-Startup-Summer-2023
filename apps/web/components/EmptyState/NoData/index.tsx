import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import NotFound from "@assets/images/404.svg";
import { Container, NotFoundText, NotFoundButton } from "@components";

interface Props {
  navigateHome?: boolean;
}

export const NoData: FC<Props> = ({ navigateHome = false }) => {
  return (
    <Container>
      <Image
        alt="Page Not Found"
        src={NotFound}
        placeholder="blur"
        blurDataURL="@assets/images/404.svg"
      />
      <NotFoundText>Упс, здесь еще ничего нет!</NotFoundText>
      {navigateHome && (
        <Link href="/">
          <NotFoundButton>Поиск вакансий</NotFoundButton>
        </Link>
      )}
    </Container>
  );
};
