import React, { FC } from "react";
import Image from "next/image";

import Location from "@assets/icons/location.svg";
import {
  Container,
  ProfessionTitle,
  JobInfoContainer,
  LocationInfoContainer,
  DelimeterContainer,
  WrapperLink,
} from "./styles";
import { SemiBoldText } from "@components";
import { Vacancy } from "@types";

const transformPayment = (
  paymentFrom: number,
  paymentTo: number,
  agreement: boolean
) => {
  const prefix = "з/п";
  if (agreement) return `${prefix} договорная`;
  if (paymentFrom !== 0 && paymentTo !== 0)
    return `${prefix} ${paymentFrom} - ${paymentTo}`;
  if (paymentFrom !== 0) return `${prefix} от ${paymentFrom}`;
  if (paymentTo !== 0) return `${prefix} ${paymentTo}`;
};

interface Props extends Vacancy {
  isLink?: boolean;
}

export const VacancyItem: FC<Props> = ({
  id,
  profession,
  type_of_work,
  town,
  payment_from,
  payment_to,
  agreement,
  currency,
  isLink = true,
}) => {
  return (
    <WrapperLink href={`/vacancy/${id}`} target="_blank" isLink={isLink}>
      <Container>
        <ProfessionTitle isLink={isLink}>{profession}</ProfessionTitle>
        <JobInfoContainer>
          <SemiBoldText>
            {transformPayment(payment_from, payment_to, agreement)}{" "}
            {!agreement && currency}
          </SemiBoldText>
          <DelimeterContainer>&#x2022;</DelimeterContainer>
          {type_of_work.title}
        </JobInfoContainer>
        <LocationInfoContainer>
          <Image alt="Location" src={Location} />
          {town.title}
        </LocationInfoContainer>
      </Container>
    </WrapperLink>
  );
};
