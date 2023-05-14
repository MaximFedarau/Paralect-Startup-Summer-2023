import React, { FC } from "react";
import Head from "next/head";

import { NoVacancies } from "@components";

const Home: FC = () => {
  return (
    <>
      <Head>
        <title>Поиск вакансий</title>
      </Head>
      <NoVacancies />
    </>
  );
};

export default Home;
