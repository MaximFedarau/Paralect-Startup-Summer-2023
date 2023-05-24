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
  VacanciesPagination,
  ErrorState,
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

  // we need to get all favorites to handle vacancies shift (when on one page we have 3 vacancies, but on the others we have 4)
  // getting all favorites from all pages
  const getFavorites = async (page: number) => {
    if (favorites.length === 500 || !isFavoritesLoading) return; // data limit || finished loading
    try {
      setIsFavoritesLoading(true);
      const {
        data: { objects, total, more },
      } = await axios.get<Vacancies>(
        `/api/favorites?${transformFavorites(favoritesIds)}&page=${page}`
      );
      setTotal(total);
      setFavorites((state) => state.concat(objects));
      if (more) getFavorites(page + 1);
      else {
        // finished loading
        setIsFavoritesLoading(false);
        setIsFavoritesError(false);
      }
    } catch (error) {
      console.error(error);
      setIsFavoritesLoading(false);
      setIsFavoritesError(true);
    }
  };

  const onPageChange = (value: number) => {
    setActivePage(value);
  };

  // remove vacancies from favorites
  useEffect(() => {
    const unsubscribe = (listener.startListening as AppStartListening)({
      actionCreator: removeFavorite,
      effect: ({ payload }) => {
        setFavorites(favorites.filter(({ id }) => id != payload));
        setTotal(total - 1);
      },
    });

    return () => unsubscribe();
  }, [favorites, total]);

  // initial favorites fetch
  useEffect(() => {
    if (favoritesIds.length) getFavorites(0);
  }, [favoritesIds]);

  // go to the previous page if current is empty
  useEffect(() => {
    if (
      !favorites.slice((activePage - 1) * 4, Math.min(activePage * 4, total))
        .length &&
      total > 0
    ) {
      setActivePage(activePage - 1);
    }
  }, [favorites, activePage, total]);

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
          ) : isFavoritesError ? (
            <ErrorState />
          ) : (
            <VacancyContentContainer>
              {favorites
                .slice((activePage - 1) * 4, Math.min(activePage * 4, total))
                .map((info) => (
                  <VacancyItem key={info.id} {...info} />
                ))}
              {total > 4 && (
                <VacanciesPagination
                  total={Math.ceil(total / 4)}
                  value={activePage}
                  onChange={onPageChange}
                />
              )}
            </VacancyContentContainer>
          )
        ) : (
          <NoData navigateHome />
        )}
      </VacancyContainer>
    </>
  );
};

export default Favorites;
