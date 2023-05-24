import React, { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import {
  isRequestProcessingSelector,
  isRequestErrorSelector,
  setIsRequestProcessing,
  setIsRequestError,
} from "@store/requestInfo";

interface Props {
  vacancies: Vacancy[];
  setVacancies: React.Dispatch<React.SetStateAction<Vacancy[]>>;
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  total: number;
  onSearchClick: (params?: SearchQuery) => void;
}

export const List: FC<Props> = ({
  vacancies,
  setVacancies,
  activePage,
  setActivePage,
  total,
  onSearchClick,
}) => {
  const dispatch = useDispatch();
  const isRequestProcessing = useSelector(isRequestProcessingSelector);
  const isRequestError = useSelector(isRequestErrorSelector);

  const searchBarValue = useSelector(requestSearchBarValueSelector);
  const { requestCatalogue, requestPaymentFrom, requestPaymentTo } =
    useSelector(requestFiltersSelector);

  const onPageChange = async (value: number) => {
    try {
      dispatch(setIsRequestProcessing(true));
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
      dispatch(setIsRequestError(false));
    } catch (error) {
      console.error(error);
      dispatch(setIsRequestError(true));
    } finally {
      setActivePage(value);
      dispatch(setIsRequestProcessing(false));
    }
  };

  return (
    <Container>
      <SearchBar disabled={isRequestProcessing} onClick={onSearchClick} />
      {isRequestProcessing ? (
        <LoaderContainer>
          <CustomLoader />
        </LoaderContainer>
      ) : isRequestError ? (
        <ErrorState />
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
              disabled={isRequestProcessing}
            />
          )}
        </>
      ) : (
        <NoData />
      )}
    </Container>
  );
};
