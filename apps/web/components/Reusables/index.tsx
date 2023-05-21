import styled from "@emotion/styled";
import { createPolymorphicComponent, Text, TextProps } from "@mantine/core";

import { FONTS } from "@constants";

const _DefaultText = styled(Text)`
  color: ${({ theme }) => theme.colors.grey[6]};
`;

export const DefaultText = createPolymorphicComponent<"div", TextProps>(
  _DefaultText
);

const _LargeText = styled(DefaultText)`
  font-size: ${FONTS.sizes.xl}px;
  font-weight: ${FONTS.weights.bold};
`;

export const LargeText = createPolymorphicComponent<"div", TextProps>(
  _LargeText
);

const _BaseMText = styled(DefaultText)`
  font-size: ${FONTS.sizes.lg}px;
  font-weight: ${FONTS.weights.bold};
`;

export const BaseMText = createPolymorphicComponent<"div", TextProps>(
  _BaseMText
);
