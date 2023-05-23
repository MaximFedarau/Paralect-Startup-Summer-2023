import React, { FC } from "react";
import { GetServerSideProps } from "next";

import { getVacancy } from "api";
import {
  NoData,
  VacancyItem,
  VacancyContainer,
  VacancyContentContainer,
  VacancyDescription,
} from "@components";
import { Vacancy } from "@types";
import Head from "next/head";

interface Query {
  id?: string;
}

// checking the existence of vacancy
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query as Query;
  try {
    const data = await getVacancy(id || "");
    return {
      props: {
        isError: false,
        data,
      },
    };
  } catch (error) {
    console.error(error, `loading vacancy page with id=${id}`);
    return {
      props: {
        isError: true,
        data: {},
      },
    };
  }
};

interface Props {
  isError: boolean;
  data: Vacancy;
}

const VacancyPage: FC<Props> = ({ isError, data }) => {
  if (isError)
    return (
      <>
        <Head>
          <title>404</title>
        </Head>
        <NoData />;
      </>
    );
  return (
    <>
      <Head>
        <title>{data.profession}</title>
      </Head>
      <VacancyContainer>
        <VacancyContentContainer>
          <VacancyItem isLink={false} {...data} />
          <VacancyDescription
            dangerouslySetInnerHTML={{ __html: data.vacancyRichText }}
          />
        </VacancyContentContainer>
      </VacancyContainer>
    </>
  );
};

export default VacancyPage;
