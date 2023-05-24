import React, { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useMantineTheme } from "@mantine/core";
import { IconX, IconChevronDown, IconChevronUp } from "@tabler/icons-react";

import {
  ErrorContainer,
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
import {
  LargeText,
  DarkBlueButton,
  CustomLoader,
  ErrorState,
} from "@components";
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
  isRequestProcessing?: boolean;
}

export const Filters: FC<Props> = ({
  onSearchClick,
  isRequestProcessing = false,
}) => {
  // states to change inputs styles
  const { colors } = useMantineTheme();
  const [isCataloguesOpened, setIsCataloguesOpened] = useState(false);
  const chevronColor = isCataloguesOpened ? colors.blue[4] : colors.grey[4];
  const cataloguesStyles = {
    input: {
      borderColor: isCataloguesOpened ? colors.blue[4] : colors.grey[3],
    },
  };

  const dispatch = useDispatch();
  const { currentCatalogue, currentPaymentFrom, currentPaymentTo } =
    useSelector(currentFiltersSelector);
  const searchBarValue = useSelector(currentSearchBarValueSelector);

  const [catalogues, setCatalogues] = useState<SelectItem[]>([]);
  const [isError, setIsError] = useState(false);
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
      setIsError(false);
    } catch (error) {
      console.error(error);
      setIsError(true);
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
      {isError ? (
        <ErrorContainer>
          <ErrorState />
        </ErrorContainer>
      ) : isLoading ? (
        <CustomLoader />
      ) : (
        <Container>
          <HeaderContainer>
            <LargeText>Фильтры</LargeText>
            <DropZone onClick={onDrop}>
              Сбросить все
              <IconX />
            </DropZone>
          </HeaderContainer>
          <FiltersContainer>
            <FilterContainer>
              <FilterSelect
                data={catalogues}
                label="Отрасль"
                placeholder="Выберите отрасль"
                rightSection={
                  isCataloguesOpened ? (
                    <IconChevronUp color={chevronColor} />
                  ) : (
                    <IconChevronDown color={chevronColor} />
                  )
                }
                styles={cataloguesStyles}
                value={currentCatalogue}
                onChange={(value) => dispatch(setCurrentCatalogue(value || ""))}
                onDropdownOpen={() => setIsCataloguesOpened(true)}
                onDropdownClose={() => setIsCataloguesOpened(false)}
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
            <DarkBlueButton onClick={onSubmit} disabled={isRequestProcessing}>
              Применить
            </DarkBlueButton>
          </FiltersContainer>
        </Container>
      )}
    </>
  );
};
