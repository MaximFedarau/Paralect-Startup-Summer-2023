import React, { FC } from "react";
import Head from "next/head";

import { NoData } from "@components";

const Page404: FC = () => {
  return (
    <>
      <Head>
        <title>404</title>
      </Head>
      <NoData />
    </>
  );
};

export default Page404;
