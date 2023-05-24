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
import {
  setIsRequestProcessing,
  setIsRequestError,
  activePageSelector,
  setActivePage,
} from "@store/requestInfo";

export const Vacancies: FC = () => {
  const dispatch = useDispatch();

  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [total, setTotal] = useState(0);
  const activePage = useSelector(activePageSelector);

  const getVacancies = async (
    page: number,
    isOriginalRequest: boolean, // with new search data
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
        `/api/vacancies?page=${page - 1}${
          keyword && keyword.trim().length ? `&keyword=${keyword.trim()}` : ""
        }${catalogueValue ? `&catalogues=${catalogueValue}` : ""}${
          payment_from ? `&payment_from=${payment_from}` : ""
        }${payment_to ? `&payment_to=${payment_to}` : ""}`
      );
      dispatch(setActivePage(page));
      if (isOriginalRequest) setTotal(total);
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
  const requestFilters = useSelector(requestFiltersSelector);
  useEffect(() => {
    getVacancies(
      activePage,
      true,
      requestSearchBarValue,
      ...Object.values(requestFilters)
    );
  }, []);

  const onSearchClick = async (params: SearchQuery) => {
    await getVacancies(1, true, ...Object.values(params));
  };

  const onPageChange = async (page: number, params: SearchQuery) => {
    await getVacancies(page, false, ...Object.values(params));
  };

  const listProps = {
    vacancies,
    activePage,
    total,
    onSearchClick,
    onPageChange,
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
