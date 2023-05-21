import React, { FC } from "react";

import { Container, ContentContainer } from "./styles";
import { Filters } from "./Filters";
import { List } from "./List";

export const Vacancies: FC = () => {
  return (
    <Container>
      <ContentContainer>
        <Filters />
        <List />
      </ContentContainer>
    </Container>
  );
};
