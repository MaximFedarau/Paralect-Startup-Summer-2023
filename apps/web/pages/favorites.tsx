import React, { FC } from "react";
import Head from "next/head";

import Page404 from "./404";

const Favorites: FC = () => {
  return (
    <>
      <Head>
        <title>Избранное</title>
      </Head>
      <Page404 />
    </>
  );
};

export default Favorites;
