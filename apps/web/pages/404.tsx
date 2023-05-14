import React, { FC } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  Text,
  TextProps,
  Button,
  ButtonProps,
  createPolymorphicComponent,
} from "@mantine/core";
import styled from "@emotion/styled";

import NotFound from "@assets/images/404.svg";
import { SIZES, FONTS } from "@constants";

const Page404: FC = () => {
  return (
    <>
      <Head>
        <title>404</title>
      </Head>
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
    </>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${SIZES["4xl"]}px;
  margin: ${SIZES["28xl"]}px 0;
  width: 100%;
`;

const _NotFoundText = styled(Text)`
  color: ${({ theme }) => theme.colors.grey[6]};
  font-weight: ${FONTS.weights.bold};
  font-size: ${FONTS.sizes["2xl"]}px;
`;

const NotFoundText = createPolymorphicComponent<"div", TextProps>(
  _NotFoundText
);

const _NotFoundButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.blue[0]};
  color: ${({ theme }) => theme.colors.blue[5]};
`;

const NotFoundButton = createPolymorphicComponent<"button", ButtonProps>(
  _NotFoundButton
);

export default Page404;
