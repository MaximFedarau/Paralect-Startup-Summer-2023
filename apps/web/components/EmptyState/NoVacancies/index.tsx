import React, { FC } from "react";
import Image from "next/image";

import Balloon from "@assets/images/balloon.svg";
import { Container, NotFoundText } from "@components/EmptyState";

export const NoVacancies: FC = () => {
  return (
    <Container>
      <Image
        alt="Nothing found"
        src={Balloon}
        placeholder="blur"
        blurDataURL="@assets/images/balloon.svg"
      />
      <NotFoundText>По вашему запросу ничего не найдено</NotFoundText>
    </Container>
  );
};
