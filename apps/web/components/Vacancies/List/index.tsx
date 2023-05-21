import React, { FC } from "react";

import { Container } from "./styles";
import { SearchBar } from "@components/Vacancies/SearchBar";
import { NoVacancies } from "@components/EmptyState";

export const List: FC = () => {
  return (
    <Container>
      <SearchBar />
      <NoVacancies />
    </Container>
  );
};
