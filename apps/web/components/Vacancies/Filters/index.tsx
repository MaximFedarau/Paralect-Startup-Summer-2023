import React, { FC, useState, useEffect } from "react";
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
import { LargeText, DarkBlueButton, CustomLoader } from "@components";

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
  catalogueValue: string;
  onCatalogueChange: (value: string) => void;
  paymentFromValue: string;
  onPaymentFromChange: (value: string) => void;
  paymentToValue: string;
  onPaymentToChange: (value: string) => void;
  onSearchClick: () => void;
}

export const Filters: FC<Props> = ({
  catalogueValue,
  onCatalogueChange,
  paymentFromValue,
  onPaymentFromChange,
  paymentToValue,
  onPaymentToChange,
  onSearchClick,
}) => {
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
    onCatalogueChange("");
    onPaymentFromChange("");
    onPaymentToChange("");
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
                value={catalogueValue}
                onChange={onCatalogueChange}
                data={catalogues}
              />
            </FilterContainer>
            <FilterContainer>
              <FilterSelect
                label="Оклад"
                placeholder="От"
                data={payment}
                value={paymentFromValue}
                onChange={onPaymentFromChange}
              />
              <FilterSelect
                placeholder="До"
                data={payment}
                value={paymentToValue}
                onChange={onPaymentToChange}
              />
            </FilterContainer>
            <DarkBlueButton onClick={onSearchClick}>Применить</DarkBlueButton>
          </FiltersContainer>
        </Container>
      )}
    </>
  );
};
