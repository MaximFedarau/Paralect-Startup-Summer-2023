import React, { FC } from "react";

import { Container, ContentContainer } from "./styles";
import { Filters } from "./Filters";

export const Vacancies: FC = () => {
  return (
    <Container>
      <ContentContainer>
        <Filters />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "red",
            width: "100%",
          }}
        >
          <div>2</div>
          <div>3</div>
        </div>
      </ContentContainer>
    </Container>
  );
};
