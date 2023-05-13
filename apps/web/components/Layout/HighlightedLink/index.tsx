import React, { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Text, useMantineTheme } from "@mantine/core";

interface Props {
  href: string;
  children: string;
}

export const HighlightedLink: FC<Props> = ({ href, children }) => {
  const router = useRouter();
  const { colors } = useMantineTheme();
  return (
    <Link
      href={href}
      style={{
        color: router.asPath === href ? colors.blue[4] : colors.grey[6],
      }}
    >
      <Text>{children}</Text>
    </Link>
  );
};
