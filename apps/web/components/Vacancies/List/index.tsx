import React, { FC } from "react";
import { useSelector } from "react-redux";

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
import { Vacancy, SearchQuery } from "@types";
import {
  requestSearchBarValueSelector,
  requestFiltersSelector,
} from "@store/vacanciesForm";
import {
  isRequestProcessingSelector,
  isRequestErrorSelector,
} from "@store/requestInfo";

interface Props {
  vacancies: Vacancy[];
  activePage: number;
  total: number;
  onSearchClick: (params?: SearchQuery) => Promise<void>;
  onPageChange: (page: number, params?: SearchQuery) => Promise<void>;
}

export const List: FC<Props> = ({
  vacancies,
  activePage,
  total,
  onSearchClick,
  onPageChange,
}) => {
  const isRequestProcessing = useSelector(isRequestProcessingSelector);
  const isRequestError = useSelector(isRequestErrorSelector);

  const searchBarValue = useSelector(requestSearchBarValueSelector);
  const { requestCatalogue, requestPaymentFrom, requestPaymentTo } =
    useSelector(requestFiltersSelector);

  const pageChangeHandler = async (value: number) => {
    await onPageChange(value, {
      searchBarValue,
      catalogue: requestCatalogue,
      paymentFrom: requestPaymentFrom,
      paymentTo: requestPaymentTo,
    });
  };

  return (
    <Container>
      <SearchBar disabled={isRequestProcessing} onSearchClick={onSearchClick} />
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
              onChange={pageChangeHandler}
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
