import React, { ChangeEvent, FC, useState } from "react";

import { Container, ContentContainer } from "./styles";
import { Filters } from "./Filters";
import { List } from "./List";

export const Vacancies: FC = () => {
  const [catalogueValue, onCatalogueChange] = useState("");
  const [paymentFromValue, onPaymentFromChange] = useState("");
  const [paymentToValue, onPaymentToChange] = useState("");
  const filtersProps = {
    catalogueValue,
    onCatalogueChange,
    paymentFromValue,
    onPaymentFromChange,
    paymentToValue,
    onPaymentToChange,
  };

  const [searchBarValue, onSearchBarChange] = useState("");
  const handleSearchBar = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onSearchBarChange(target.value);
  };
  const listProps = {
    searchBarValue,
    onSearchBarChange: handleSearchBar,
  };

  return (
    <Container>
      <ContentContainer>
        <Filters {...filtersProps} />
        <List {...listProps} />
      </ContentContainer>
    </Container>
  );
};
