import React, { FC, useState, useEffect } from "react";
import Head from "next/head";
import { useSelector } from "react-redux";
import axios from "axios";

import {
  NoData,
  CustomLoader,
  VacancyItem,
  LoaderContainer,
  VacancyContainer,
  VacancyContentContainer,
} from "@components";
import { favoritesSelector } from "@store/favorites";
import { Vacancies, Vacancy } from "@types";
import { AppStartListening, listener } from "@store/middlewares";
import { removeFavorite } from "@store/favorites";

const transformFavorites = (favorites: string[]) => {
  let res = "";
  favorites.map((id, index) => {
    res += `ids=${id}`;
    if (index != favorites.length - 1) res += "&";
  });
  return res;
};

const Favorites: FC = () => {
  const favoritesIds = useSelector(favoritesSelector);

  const [favorites, setFavorites] = useState<Vacancy[]>([]);
  const [total, setTotal] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [isFavoritesError, setIsFavoritesError] = useState(false);
  const [isFavoritesLoading, setIsFavoritesLoading] = useState(true);

  const getFavorites = async () => {
    try {
      setIsFavoritesLoading(true);
      const {
        data: { objects, total },
      } = await axios.get<Vacancies>(
        `/api/favorites?${transformFavorites(favoritesIds)}`
      );
      setTotal(total);
      setActivePage(1);
      setFavorites(objects);
      setIsFavoritesError(false);
    } catch (error) {
      console.error(error);
      setIsFavoritesError(true);
    } finally {
      setIsFavoritesLoading(false);
    }
  };

  // remove vacancies from favorites
  useEffect(() => {
    const unsubscribe = (listener.startListening as AppStartListening)({
      actionCreator: removeFavorite,
      effect: ({ payload }) => {
        setFavorites(favorites.filter(({ id }) => id != payload));
      },
    });

    return () => unsubscribe();
  }, [favorites]);

  // initial favorites fetch
  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <>
      <Head>
        <title>Избранное</title>
      </Head>
      <VacancyContainer>
        {favoritesIds.length ? (
          isFavoritesLoading ? (
            <>
              <LoaderContainer>
                <CustomLoader />
              </LoaderContainer>
            </>
          ) : (
            <VacancyContentContainer>
              {favorites.map((info) => (
                <VacancyItem key={info.id} {...info} />
              ))}
            </VacancyContentContainer>
          )
        ) : (
          <NoData />
        )}
      </VacancyContainer>
    </>
  );
};

export default Favorites;
