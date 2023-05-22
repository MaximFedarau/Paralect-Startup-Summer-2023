import React, { FC } from "react";
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

interface Props {
  disabled?: boolean;
  onClick: any;
}

export const SearchBar: FC<Props> = ({ onClick, ...props }) => {
  const dispatch = useDispatch();
  const currentSearchBarValue = useSelector(currentSearchBarValueSelector);
  const { currentCatalogue, currentPaymentFrom, currentPaymentTo } =
    useSelector(currentFiltersSelector);

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
    onClick(
      currentSearchBarValue,
      currentCatalogue,
      currentPaymentFrom,
      currentPaymentTo
    );
  };

  return (
    <Container disabled={props.disabled}>
      <SearchInput
        size="md"
        placeholder="Введите название вакансии"
        icon={<Image src={Magnifier} alt="Magnifier" />}
        value={currentSearchBarValue}
        onChange={({ target }) =>
          dispatch(setCurrentSearchBarValue(target.value))
        }
        {...props}
      />
      {!props.disabled && <SubmitButton onClick={onSubmit}>Поиск</SubmitButton>}
    </Container>
  );
};
