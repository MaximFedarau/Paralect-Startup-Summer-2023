import React, { FC } from "react";
import Image from "next/image";

import Balloon from "@assets/images/balloon.svg";
import { Container, NotFoundText } from "@components/EmptyState";

export const ErrorState: FC = () => {
  return (
    <Container>
      <Image
        alt="Nothing found"
        src={Balloon}
        placeholder="blur"
        blurDataURL="@assets/images/balloon.svg"
      />
      <NotFoundText>
        Произошла какая-то ошибка. Попробуйте еще раз позже
      </NotFoundText>
    </Container>
  );
};
