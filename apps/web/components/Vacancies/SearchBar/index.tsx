import React, { FC, ChangeEventHandler } from "react";
import Image from "next/image";

import Magnifier from "@assets/icons/magnifier.svg";
import { Container, SubmitButton, SearchInput } from "./styles";

interface Props {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

export const SearchBar: FC<Props> = (props) => {
  return (
    <Container disabled={props.disabled}>
      <SearchInput
        size="md"
        placeholder="Введите название вакансии"
        icon={<Image src={Magnifier} alt="Magnifier" />}
        {...props}
      />
      {!props.disabled && <SubmitButton>Поиск</SubmitButton>}
    </Container>
  );
};
