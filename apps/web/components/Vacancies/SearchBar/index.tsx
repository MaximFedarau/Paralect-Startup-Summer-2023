import React, { FC } from "react";
import Image from "next/image";

import Magnifier from "@assets/icons/magnifier.svg";
import { Container, SubmitButton, SearchInput } from "./styles";

export const SearchBar: FC = () => {
  return (
    <Container>
      <SearchInput
        size="md"
        placeholder="Введите название вакансии"
        icon={<Image src={Magnifier} alt="Magnifier" />}
      />
      <SubmitButton>Поиск</SubmitButton>
    </Container>
  );
};
