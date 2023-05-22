import React, { FC, ChangeEventHandler } from "react";

import { Container } from "./styles";
import { SearchBar } from "@components/Vacancies/SearchBar";
import { NoVacancies } from "@components/EmptyState";

interface Props {
  searchBarValue: string;
  onSearchBarChange: ChangeEventHandler<HTMLInputElement>;
}

export const List: FC<Props> = ({ searchBarValue, onSearchBarChange }) => {
  return (
    <Container>
      <SearchBar value={searchBarValue} onChange={onSearchBarChange} />
      <NoVacancies />
    </Container>
  );
};
