import React, { FC, ChangeEventHandler } from "react";

import { Container, LoaderContainer } from "./styles";
import { SearchBar } from "@components/Vacancies/SearchBar";
import { NoVacancies, CustomLoader, VacancyItem } from "@components";
import { Vacancy } from "@types";

interface Props {
  vacancies: Vacancy[];
  isLoading: boolean;
  isError: boolean;
  onSearchClick: any;
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
