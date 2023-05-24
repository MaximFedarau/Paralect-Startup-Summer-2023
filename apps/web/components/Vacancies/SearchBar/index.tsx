import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

import Magnifier from "@assets/icons/magnifier.svg";
import {
  currentFiltersSelector,
  currentSearchBarValueSelector,
  setCurrentSearchBarValue,
  setRequestState,
} from "@store/vacanciesForm";
import { Container, SubmitButton, SearchInput } from "./styles";
import { SearchQuery } from "@types";

interface Props {
  disabled?: boolean;
  onClick: (params?: SearchQuery) => void;
}

export const SearchBar: FC<Props> = ({ onClick, ...props }) => {
  const dispatch = useDispatch();
  const currentSearchBarValue = useSelector(currentSearchBarValueSelector);
  const { currentCatalogue, currentPaymentFrom, currentPaymentTo } =
    useSelector(currentFiltersSelector);

  // change Container styles depending on input hover & focus
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const onSubmit = () => {
    // update global request values
    dispatch(
      setRequestState({
        catalogue: currentCatalogue,
        paymentFrom: currentPaymentFrom,
        paymentTo: currentPaymentTo,
        searchBarValue: currentSearchBarValue,
      })
    );
    // make a request
    onClick({
      searchBarValue: currentSearchBarValue,
      catalogue: currentCatalogue,
      paymentFrom: currentPaymentFrom,
      paymentTo: currentPaymentTo,
    });
  };

  return (
    <Container disabled={props.disabled} focused={focused || hovered}>
      <SearchInput
        size="md"
        placeholder="Введите название вакансии"
        icon={<Image src={Magnifier} alt="Magnifier" />}
        value={currentSearchBarValue}
        onChange={({ target }) =>
          dispatch(setCurrentSearchBarValue(target.value))
        }
        onFocus={() => setFocused(true)}
        onMouseEnter={() => setHovered(true)}
        onBlur={() => setFocused(false)}
        onMouseOut={() => setHovered(false)}
        {...props}
      />
      {!props.disabled && <SubmitButton onClick={onSubmit}>Поиск</SubmitButton>}
    </Container>
  );
};
