import React, { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useMantineTheme } from "@mantine/core";
import {
  IconX,
  IconChevronDown,
  IconChevronUp,
  IconSelector,
} from "@tabler/icons-react";

import {
  ErrorContainer,
  Container,
  HeaderContainer,
  DropZone,
  FiltersContainer,
  FilterContainer,
  FilterSelect,
  FilterInput,
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
import { isRequestProcessingSelector } from "@store/requestInfo";
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
  onSearchClick: (params?: SearchQuery) => Promise<void>;
}

export const Filters: FC<Props> = ({ onSearchClick }) => {
  // states to change inputs styles
  const { colors } = useMantineTheme();
  const [isDrowpdownOpened, setIsDropdownOpened] = useState(false);
  const chevronColor = isDrowpdownOpened ? colors.blue[4] : colors.grey[4];
  const cataloguesStyles = {
    input: {
      borderColor: isDrowpdownOpened ? colors.blue[4] : colors.grey[3],
    },
  };

  const dispatch = useDispatch();

  const isRequestProcessing = useSelector(isRequestProcessingSelector);

  const { currentCatalogue, currentPaymentFrom, currentPaymentTo } =
    useSelector(currentFiltersSelector);
  const searchBarValue = useSelector(currentSearchBarValueSelector);

  const [catalogues, setCatalogues] = useState<SelectItem[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(catalogues.length ? false : true); // catalogues is REQUIRED

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
    } finally {
      setIsLoading(false);
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

  const onSubmit = async () => {
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
    await onSearchClick({
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
      ) : isError ? (
        <ErrorContainer>
          <ErrorState />
        </ErrorContainer>
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
                  isDrowpdownOpened ? (
                    <IconChevronUp color={chevronColor} />
                  ) : (
                    <IconChevronDown color={chevronColor} />
                  )
                }
                styles={cataloguesStyles}
                value={currentCatalogue}
                onChange={(value) => dispatch(setCurrentCatalogue(value || ""))}
                onDropdownOpen={() => setIsDropdownOpened(true)}
                onDropdownClose={() => setIsDropdownOpened(false)}
              />
            </FilterContainer>
            <FilterContainer>
              <FilterInput
                label="Оклад"
                placeholder="От"
                value={currentPaymentFrom}
                onChange={({ target: { value } }) =>
                  dispatch(setCurrentPaymentFrom(value.replace(/\D/g, "")))
                }
                rightSection={<IconSelector />}
              />
              <FilterInput
                placeholder="До"
                value={currentPaymentTo}
                onChange={({ target: { value } }) =>
                  dispatch(setCurrentPaymentTo(value.replace(/\D/g, "")))
                }
                rightSection={<IconSelector />}
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
