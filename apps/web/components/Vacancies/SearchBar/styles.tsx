import styled from "@emotion/styled";
import {
  createPolymorphicComponent,
  ButtonProps,
  Input,
  InputProps,
} from "@mantine/core";

import { SIZES } from "@constants/theme";
import { DarkBlueButton } from "@components/Reusables";

export const Container = styled.div<{
  disabled: boolean | undefined;
  focused: boolean | undefined;
}>`
  display: flex;
  width: 100%;
  align-items: center;
  background-color: white;
  border: 1px solid
    ${({ theme, focused }) =>
      focused ? theme.colors.blue[4] : theme.colors.grey[3]};
  border-radius: ${SIZES.sm}px;
  overflow: hidden;
  padding: 0 ${({ disabled }) => (disabled ? 0 : SIZES.md)}px 0 0;
`;

const _SubmitButton = styled(DarkBlueButton)`
  flex: 1;
  height: calc(${SIZES["8xl"]}px - calc(${SIZES["8xl"]}px / 3));
`;

export const SubmitButton = createPolymorphicComponent<"button", ButtonProps>(
  _SubmitButton
);

const _SearchInput = styled(Input)`
  flex: 15;
  & .mantine-Input-input {
    border: none;
    height: ${SIZES["8xl"]}px;
  }
`;

export const SearchInput = createPolymorphicComponent<"input", InputProps>(
  _SearchInput
);
