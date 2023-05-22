import React, { ChangeEvent, FC, useState, useEffect } from "react";
import axios from "axios";

import { Container, ContentContainer } from "./styles";
import { Filters } from "./Filters";
import { List } from "./List";
import { Vacancy } from "@types";

interface Vacancies {
  more: boolean;
  total: number;
  objects: Vacancy[];
}

export const Vacancies: FC = () => {
  const [catalogueValue, onCatalogueChange] = useState("");
  const [paymentFromValue, onPaymentFromChange] = useState("");
  const [paymentToValue, onPaymentToChange] = useState("");

  const [searchBarValue, onSearchBarChange] = useState("");
  const handleSearchBar = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onSearchBarChange(target.value);
  };

  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [isVacanciesLoading, setIsVacanciesLoading] = useState(true);
  const [isVacanciesError, setIsVacanciesError] = useState(false);

  const onSearchClick = async () => {
    await getVacancies(
      searchBarValue,
      catalogueValue,
      paymentFromValue,
      paymentToValue
    );
  };

  const getVacancies = async (
    keyword?: string,
    catalogueValue?: string,
    payment_from?: string,
    payment_to?: string
  ) => {
    try {
      setIsVacanciesLoading(true);
      const {
        data: { objects },
      } = await axios.get<Vacancies>(
        `/api/vacancies?${
          keyword && keyword.trim().length ? `keyword=${keyword.trim()}` : ""
        }${catalogueValue ? `&catalogues=${catalogueValue}` : ""}${
          payment_from ? `&payment_from=${payment_from}` : ""
        }${payment_to ? `&payment_to=${payment_to}` : ""}`
      );
      setVacancies(objects);
      setIsVacanciesError(false);
    } catch (error) {
      console.error(error);
      setIsVacanciesError(true);
    } finally {
      setIsVacanciesLoading(false);
    }
  };

  // initial vacancies fetch
  useEffect(() => {
    getVacancies();
  }, []);

  const filtersProps = {
    catalogueValue,
    onCatalogueChange,
    paymentFromValue,
    onPaymentFromChange,
    paymentToValue,
    onPaymentToChange,
    onSearchClick,
  };

  const listProps = {
    searchBarValue,
    onSearchBarChange: handleSearchBar,
    vacancies,
    isLoading: isVacanciesLoading,
    isError: isVacanciesError,
    onSearchClick,
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
