import React, { FC } from "react";
import Head from "next/head";

import { Vacancies } from "@components";

const Home: FC = () => {
  return (
    <>
      <Head>
        <title>Поиск вакансий</title>
      </Head>
      <Vacancies />
    </>
  );
};

export default Home;
