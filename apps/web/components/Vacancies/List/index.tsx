import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { Container } from "./styles";
import { SearchBar } from "@components/Vacancies/SearchBar";
import {
  ErrorState,
  CustomLoader,
  VacancyItem,
  LoaderContainer,
  VacanciesPagination,
  NoData,
} from "@components";
import { Vacancies, Vacancy, SearchQuery } from "@types";
import {
  requestSearchBarValueSelector,
  requestFiltersSelector,
} from "@store/vacanciesForm";

interface Props {
  vacancies: Vacancy[];
  setVacancies: React.Dispatch<React.SetStateAction<Vacancy[]>>;
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  total: number;
  isLoading: boolean;
  isError: boolean;
  onSearchClick: (params?: SearchQuery) => void;
}

export const List: FC<Props> = ({
  vacancies,
  setVacancies,
  activePage,
  setActivePage,
  total,
  isLoading,
  isError,
  onSearchClick,
}) => {
  const searchBarValue = useSelector(requestSearchBarValueSelector);
  const { requestCatalogue, requestPaymentFrom, requestPaymentTo } =
    useSelector(requestFiltersSelector);

  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isPageError, setIsPageError] = useState(false);

  const onPageChange = async (value: number) => {
    try {
      setIsPageLoading(true);
      const {
        data: { objects },
      } = await axios.get<Vacancies>(
        `/api/vacancies?page=${value - 1}${
          searchBarValue && searchBarValue.trim().length
            ? `&keyword=${searchBarValue.trim()}`
            : ""
        }${requestCatalogue ? `&catalogues=${requestCatalogue}` : ""}${
          requestPaymentFrom ? `&payment_from=${requestPaymentFrom}` : ""
        }${requestPaymentTo ? `&payment_to=${requestPaymentTo}` : ""}`
      );
      setVacancies(objects);
      setIsPageError(false);
    } catch (error) {
      console.error(error);
      setIsPageError(true);
    } finally {
      setActivePage(value);
      setIsPageLoading(false);
    }
  };

  return (
    <Container>
      <SearchBar
        disabled={isError || isLoading || isPageError || isPageLoading}
        onClick={onSearchClick}
      />
      {isError || isPageError ? (
        <ErrorState />
      ) : isLoading || isPageLoading ? (
        <LoaderContainer>
          <CustomLoader />
        </LoaderContainer>
      ) : vacancies.length > 0 ? (
        <>
          {vacancies.map((vacancyInfo) => (
            <VacancyItem key={vacancyInfo.id} {...vacancyInfo} />
          ))}
          {total > 4 && (
            <VacanciesPagination
              total={Math.min(Math.ceil(total / 4), 125)}
              value={activePage}
              onChange={onPageChange}
              disabled={isPageLoading}
            />
          )}
        </>
      ) : (
        <NoData />
      )}
    </Container>
  );
};
