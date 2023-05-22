import React, { FC, ChangeEventHandler } from "react";
import Image from "next/image";

import Magnifier from "@assets/icons/magnifier.svg";
import { Container, SubmitButton, SearchInput } from "./styles";

interface Props {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const SearchBar: FC<Props> = (props) => {
  return (
    <Container>
      <SearchInput
        size="md"
        placeholder="Введите название вакансии"
        icon={<Image src={Magnifier} alt="Magnifier" />}
        {...props}
      />
      <SubmitButton>Поиск</SubmitButton>
    </Container>
  );
};
