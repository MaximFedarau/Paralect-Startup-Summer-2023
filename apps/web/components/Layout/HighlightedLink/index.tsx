import React, { FC, PropsWithChildren } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Text, useMantineTheme } from "@mantine/core";

interface Props extends PropsWithChildren {
  href: string;
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
