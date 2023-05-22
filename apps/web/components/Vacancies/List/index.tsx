import React, { FC } from "react";

import { Container, LoaderContainer } from "./styles";
import { SearchBar } from "@components/Vacancies/SearchBar";
import { NoVacancies, CustomLoader, VacancyItem } from "@components";
import { Vacancy, SearchQuery } from "@types";

interface Props {
  vacancies: Vacancy[];
  isLoading: boolean;
  isError: boolean;
  onSearchClick: (params?: SearchQuery) => void;
}

export const List: FC<Props> = ({
  vacancies,
  isLoading,
  isError,
  onSearchClick,
}) => {
  return (
    <Container>
      <SearchBar disabled={isError || isLoading} onClick={onSearchClick} />
      {!isLoading ? (
        <>
          {vacancies.length ? (
            <>
              {vacancies.map((vacancyInfo) => (
                <VacancyItem key={vacancyInfo.id} {...vacancyInfo} />
              ))}
            </>
          ) : (
            <NoVacancies isError={isError} />
          )}
        </>
      ) : (
        <LoaderContainer>
          <CustomLoader />
        </LoaderContainer>
      )}
    </Container>
  );
};
