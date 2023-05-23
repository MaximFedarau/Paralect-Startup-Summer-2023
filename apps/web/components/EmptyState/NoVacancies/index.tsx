import React, { FC } from "react";
import Image from "next/image";

import Balloon from "@assets/images/balloon.svg";
import { Container, NotFoundText } from "@components/EmptyState";

interface Props {
  isError?: boolean;
}

export const NoVacancies: FC<Props> = ({ isError }) => {
  return (
    <Container>
      <Image
        alt="Nothing found"
        src={Balloon}
        placeholder="blur"
        blurDataURL="@assets/images/balloon.svg"
      />
      <NotFoundText>
        {isError
          ? "Произошла какая-то ошибка. Попробуйте еще раз позже"
          : "По вашему запросу ничего не найдено"}
      </NotFoundText>
    </Container>
  );
};
