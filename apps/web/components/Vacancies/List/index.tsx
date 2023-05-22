import React, { FC, ChangeEventHandler } from "react";

import { Container, LoaderContainer } from "./styles";
import { SearchBar } from "@components/Vacancies/SearchBar";
import { NoVacancies, CustomLoader, VacancyItem } from "@components";
import { Vacancy } from "@types";

interface Props {
  searchBarValue: string;
  onSearchBarChange: ChangeEventHandler<HTMLInputElement>;
  vacancies: Vacancy[];
  isLoading: boolean;
  isError: boolean;
  onSearchClick: () => void;
}

export const List: FC<Props> = ({
  searchBarValue,
  onSearchBarChange,
  vacancies,
  isLoading,
  isError,
  onSearchClick,
}) => {
  return (
    <Container>
      <SearchBar
        value={searchBarValue}
        onChange={onSearchBarChange}
        disabled={isError || isLoading}
        onClick={onSearchClick}
      />
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
