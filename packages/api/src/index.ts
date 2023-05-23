import { AxiosError } from "axios";

import { createAPIInstance } from "./instance";

const instance = createAPIInstance();

export const getVacancies = async (
  keyword?: string,
  catalogues?: string,
  payment_from?: string,
  payment_to?: string,
  page?: string
) => {
  try {
    const { data } = await instance.get(
      `${process.env.VACANCIES_API_URL}?published=1${
        page ? `&page=${page}` : "&page=0"
      }&count=4${
        keyword && keyword.trim().length ? `&keyword=${keyword}` : ""
      }${catalogues ? `&catalogues=${catalogues}` : ""}${
        payment_from ? `&payment_from=${payment_from}` : ""
      }${payment_to ? `&payment_to=${payment_to}` : ""}${
        payment_from || payment_to ? "&no_agreement=1" : ""
      }`
    );
    return data;
  } catch (error) {
    const message = (error as AxiosError<string>).response?.data;
    console.error(
      error,
      `Getting Vacancies API with keyword=${keyword} catalogues=${catalogues} payment_from=${payment_from} payment_to=${payment_to} page=${page}`
    );
    throw Error(message || "Error occurred, while getting vacancies");
  }
};

export const getCatalogues = async () => {
  try {
    const { data } = await instance.get(process.env.CATALOGUES_API_URL);
    return data;
  } catch (error) {
    const message = (error as AxiosError<string>).response?.data;
    console.error(error, "Getting Catalogues API");
    throw Error(message || "Error occurred, while getting catalogues");
  }
};

export const getVacancy = async (id: string) => {
  try {
    const { data } = await instance.get(
      `${process.env.VACANCIES_API_URL}/${id}`
    );
    return data;
  } catch (error) {
    const message = (error as AxiosError<string>).response?.data;
    console.error(error, `Getting Vaccancy with id=${id}`);
    throw Error(message || "Error occurred, while getting vacancy");
  }
};

export const getFavorites = async (ids: string, page?: string) => {
  try {
    const { data } = await instance.get(
      `${process.env.VACANCIES_API_URL}?${ids}&page=${page || "0"}&count=100`
    );
    return data;
  } catch (error) {
    const message = (error as AxiosError<string>).response?.data;
    console.error(error, `Getting Favorites with ids=${ids}`);
    throw Error(message || "Error occurred, while getting favorites");
  }
};
