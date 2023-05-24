import React, { CSSProperties, FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { IconStar, IconStarFilled } from "@tabler/icons-react";

import Location from "@assets/icons/location.svg";
import {
  Container,
  TitleContainer,
  ProfessionTitle,
  FavoriteButton,
  JobInfoContainer,
  LocationInfoContainer,
  DelimeterContainer,
} from "./styles";
import { SemiBoldText } from "@components";
import { Vacancy } from "@types";
import {
  favoritesSelector,
  addFavorite,
  removeFavorite,
} from "@store/favorites";

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
  const dispatch = useDispatch();
  const favorites = useSelector(favoritesSelector);

  const [isFavorite, setIsFavorite] = useState(favorites.includes(id));

  const onClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    isFavorite ? dispatch(removeFavorite(id)) : dispatch(addFavorite(id));
    setIsFavorite(!isFavorite);
  };

  // using styles here to avoid React Unknown Prop Warning because of <a> (Link) styling
  const containerStyle: CSSProperties = isLink
    ? {
        width: "100%",
        alignSelf: "center",
      }
    : {
        width: "100%",
        pointerEvents: "none",
        alignSelf: "center",
      };

  return (
    <Link href={`/vacancy/${id}`} target="_blank" style={containerStyle}>
      <Container>
        <TitleContainer>
          <ProfessionTitle isLink={isLink}>{profession}</ProfessionTitle>
          <FavoriteButton
            isLink={isLink}
            isFavorite={isFavorite}
            onClick={isLink ? onClick : undefined}
          >
            {isFavorite ? <IconStarFilled /> : <IconStar />}
          </FavoriteButton>
        </TitleContainer>
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
    </Link>
  );
};
