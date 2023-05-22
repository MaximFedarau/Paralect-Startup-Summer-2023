import React, { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import axios from "axios";

import Cross from "@assets/icons/cross.svg";
import ChevronDown from "@assets/icons/chevron_down.svg";
import {
  Container,
  HeaderContainer,
  DropZone,
  FiltersContainer,
  FilterContainer,
  FilterSelect,
} from "./styles";
import {
  currentFiltersSelector,
  setCurrentFilters,
  setCurrentCatalogue,
  setCurrentPaymentFrom,
  setCurrentPaymentTo,
  currentSearchBarValueSelector,
  setRequestState,
} from "@store/vacanciesForm";
import { LargeText, DarkBlueButton, CustomLoader } from "@components";
import { SearchQuery } from "@types";

interface Industry {
  key: number;
  title: string;
  title_rus: string;
  title_trimmed: string;
  url_rus: string;
}

interface SelectItem {
  value: string;
  label: string;
}

interface Props {
  onSearchClick: (params?: SearchQuery) => void;
}

export const Filters: FC<Props> = ({ onSearchClick }) => {
  const dispatch = useDispatch();
  const { currentCatalogue, currentPaymentFrom, currentPaymentTo } =
    useSelector(currentFiltersSelector);
  const searchBarValue = useSelector(currentSearchBarValueSelector);

  const [catalogues, setCatalogues] = useState<SelectItem[]>([]);
  const [isLoading, setIsLoading] = useState(catalogues.length ? false : true); // catalogues is REQUIRED
  const payment: SelectItem[] = [];
  for (let i = 1; i <= 30; ++i) {
    const value = String(i * 10000),
      currency = value + "₽";
    payment.push({ value: value, label: currency });
  }

  const loadCatalogues = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios<Industry[]>("/api/catalogues");
      // transfrom API data
      const selectData: SelectItem[] = [];
      data.map(({ key, title }) =>
        selectData.push({ value: String(key), label: title })
      );
      setCatalogues(selectData);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!catalogues.length) loadCatalogues();
  }, [catalogues]);

  const onDrop = () => {
    dispatch(
      setCurrentFilters({
        catalogue: "",
        paymentFrom: "",
        paymentTo: "",
      })
    );
  };

  const onSubmit = () => {
    // update global request values
    dispatch(
      setRequestState({
        catalogue: currentCatalogue,
        paymentFrom: currentPaymentFrom,
        paymentTo: currentPaymentTo,
        searchBarValue,
      })
    );
    // make a request
    onSearchClick({
      searchBarValue,
      catalogue: currentCatalogue,
      paymentFrom: currentPaymentFrom,
      paymentTo: currentPaymentTo,
    });
  };

  return (
    <>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <Container>
          <HeaderContainer>
            <LargeText>Фильтры</LargeText>
            <DropZone onClick={onDrop}>
              Сбросить все
              <Image alt="Cross" src={Cross} />
            </DropZone>
          </HeaderContainer>
          <FiltersContainer>
            <FilterContainer>
              <FilterSelect
                label="Отрасль"
                placeholder="Выберите отрасль"
                rightSection={<Image alt="Chevron Down" src={ChevronDown} />}
                value={currentCatalogue}
                onChange={(value) => dispatch(setCurrentCatalogue(value || ""))}
                data={catalogues}
              />
            </FilterContainer>
            <FilterContainer>
              <FilterSelect
                label="Оклад"
                placeholder="От"
                data={payment}
                value={currentPaymentFrom}
                onChange={(value) =>
                  dispatch(setCurrentPaymentFrom(value || ""))
                }
              />
              <FilterSelect
                placeholder="До"
                data={payment}
                value={currentPaymentTo}
                onChange={(value) => dispatch(setCurrentPaymentTo(value || ""))}
              />
            </FilterContainer>
            <DarkBlueButton onClick={onSubmit}>Применить</DarkBlueButton>
          </FiltersContainer>
        </Container>
      )}
    </>
  );
};
