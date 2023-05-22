import React, { FC, useState, useEffect } from "react";
import axios from "axios";

import { Container, ContentContainer } from "./styles";
import { Filters } from "./Filters";
import { List } from "./List";
import { Vacancies as VacanciesType, Vacancy, SearchQuery } from "@types";

export const Vacancies: FC = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [total, setTotal] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [isVacanciesLoading, setIsVacanciesLoading] = useState(true);
  const [isVacanciesError, setIsVacanciesError] = useState(false);

  const onSearchClick = async ({
    searchBarValue,
    catalogue,
    paymentFrom,
    paymentTo,
  }: SearchQuery) => {
    await getVacancies(searchBarValue, catalogue, paymentFrom, paymentTo);
  };

  const getVacancies = async (
    keyword?: string,
    catalogueValue?: string,
    payment_from?: string,
    payment_to?: string
  ) => {
    try {
      setIsVacanciesLoading(true);
      const {
        data: { objects, total },
      } = await axios.get<VacanciesType>(
        `/api/vacancies?${
          keyword && keyword.trim().length ? `keyword=${keyword.trim()}` : ""
        }${catalogueValue ? `&catalogues=${catalogueValue}` : ""}${
          payment_from ? `&payment_from=${payment_from}` : ""
        }${payment_to ? `&payment_to=${payment_to}` : ""}`
      );
      setTotal(total);
      setActivePage(1);
      setVacancies(objects);
      setIsVacanciesError(false);
    } catch (error) {
      console.error(error);
      setIsVacanciesError(true);
    } finally {
      setIsVacanciesLoading(false);
    }
  };

  // initial vacancies fetch
  useEffect(() => {
    getVacancies();
  }, []);

  const listProps = {
    vacancies,
    setVacancies,
    activePage,
    setActivePage,
    total,
    isLoading: isVacanciesLoading,
    isError: isVacanciesError,
    onSearchClick,
  };

  return (
    <Container>
      <ContentContainer>
        <Filters onSearchClick={onSearchClick} />
        <List {...listProps} />
      </ContentContainer>
    </Container>
  );
};
