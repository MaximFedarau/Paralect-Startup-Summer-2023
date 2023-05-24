import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconSearch } from "@tabler/icons-react";

import { SIZES } from "@constants/theme";
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
  onSearchClick: (params?: SearchQuery) => Promise<void>;
}

export const SearchBar: FC<Props> = ({ onSearchClick, ...props }) => {
  const dispatch = useDispatch();
  const currentSearchBarValue = useSelector(currentSearchBarValueSelector);
  const { currentCatalogue, currentPaymentFrom, currentPaymentTo } =
    useSelector(currentFiltersSelector);

  // change Container styles depending on input hover & focus
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const onSubmit = async () => {
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
    await onSearchClick({
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
        icon={<IconSearch size={SIZES.lg} />}
        value={currentSearchBarValue}
        onChange={({ target: { value } }) =>
          dispatch(setCurrentSearchBarValue(value))
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
