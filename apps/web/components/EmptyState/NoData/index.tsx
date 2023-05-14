import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import NotFound from "@assets/images/404.svg";
import {
  Container,
  NotFoundText,
  NotFoundButton,
} from "@components/EmptyState";

export const NoData: FC = () => {
  return (
    <Container>
      <Image
        alt="Page Not Found"
        src={NotFound}
        placeholder="blur"
        blurDataURL="@assets/images/404.svg"
      />
      <NotFoundText>Упс, здесь еще ничего нет!</NotFoundText>
      <Link href="/">
        <NotFoundButton>Поиск вакансий</NotFoundButton>
      </Link>
    </Container>
  );
};
