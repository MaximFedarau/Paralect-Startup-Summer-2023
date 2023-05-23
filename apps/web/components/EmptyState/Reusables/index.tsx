import {
  createPolymorphicComponent,
  Text,
  TextProps,
  Button,
  ButtonProps,
} from "@mantine/core";
import styled from "@emotion/styled";

import { SIZES, FONTS } from "@constants";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${SIZES["4xl"]}px;
  margin: ${SIZES["28xl"]}px 0;
  width: 100%;
`;

const _NotFoundText = styled(Text)`
  color: ${({ theme }) => theme.colors.grey[6]};
  font-weight: ${FONTS.weights.bold};
  font-size: ${FONTS.sizes["2xl"]}px;
  text-align: center;
`;

export const NotFoundText = createPolymorphicComponent<"div", TextProps>(
  _NotFoundText
);

const _NotFoundButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.blue[0]};
  color: ${({ theme }) => theme.colors.blue[5]};
`;

export const NotFoundButton = createPolymorphicComponent<"button", ButtonProps>(
  _NotFoundButton
);
