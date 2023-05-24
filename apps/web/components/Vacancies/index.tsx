import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { Container, ContentContainer } from "./styles";
import { Filters } from "./Filters";
import { List } from "./List";
import { Vacancies as VacanciesType, Vacancy, SearchQuery } from "@types";
import {
  requestSearchBarValueSelector,
  requestFiltersSelector,
} from "@store/vacanciesForm";
import { setIsRequestProcessing, setIsRequestError } from "@store/requestInfo";

export const Vacancies: FC = () => {
  const dispatch = useDispatch();

  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [total, setTotal] = useState(0);
  const [activePage, setActivePage] = useState(1);

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
      dispatch(setIsRequestProcessing(true));
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
      dispatch(setIsRequestError(false));
    } catch (error) {
      console.error(error);
      dispatch(setIsRequestError(true));
    } finally {
      dispatch(setIsRequestProcessing(false));
    }
  };

  // initial vacancies fetch (when page loads for the first time)
  const requestSearchBarValue = useSelector(requestSearchBarValueSelector);
  const { requestCatalogue, requestPaymentFrom, requestPaymentTo } =
    useSelector(requestFiltersSelector);
  useEffect(() => {
    getVacancies(
      requestSearchBarValue,
      requestCatalogue,
      requestPaymentFrom,
      requestPaymentTo
    );
  }, []);

  const listProps = {
    vacancies,
    setVacancies,
    activePage,
    setActivePage,
    total,
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
