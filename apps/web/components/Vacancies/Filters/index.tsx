import React, { FC } from "react";
import Image from "next/image";

import Cross from "@assets/icons/cross.svg";
import ChevronDown from "@assets/icons/chevron_down.svg";
import {
  Container,
  HeaderContainer,
  DropZone,
  FiltersContainer,
  FilterContainer,
  FilterSelect,
  SubmitButton,
} from "./styles";
import { LargeText } from "@components";

export const Filters: FC = () => {
  return (
    <Container>
      <HeaderContainer>
        <LargeText>Фильтры</LargeText>
        <DropZone>
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
            data={["item"]}
          />
        </FilterContainer>
        <FilterContainer>
          <FilterSelect label="Оклад" placeholder="От" data={["item"]} />
          <FilterSelect placeholder="До" data={["item"]} />
        </FilterContainer>
        <SubmitButton>Применить</SubmitButton>
      </FiltersContainer>
    </Container>
  );
};
