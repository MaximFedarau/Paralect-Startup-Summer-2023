import React, { FC } from "react";
import Head from "next/head";

import { NoData } from "@components";

const Favorites: FC = () => {
  return (
    <>
      <Head>
        <title>Избранное</title>
      </Head>
      <NoData />
    </>
  );
};

export default Favorites;
