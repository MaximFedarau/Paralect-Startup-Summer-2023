import { AxiosError } from "axios";

import { createAPIInstance } from "./instance";

const instance = createAPIInstance();

export const getVacancies = async (keyword?: string) => {
  try {
    const { data } = await instance.get(
      `${process.env.VACANCIES_API_URL}?page=0&count=10${
        keyword && keyword.trim().length ? `&keyword=${keyword}` : ""
      }`
    );
    return data;
  } catch (error) {
    const message = (error as AxiosError<string>).response?.data;
    throw Error(message || "Error occurred, while getting vacancies");
  }
};

export const getCatalogues = async () => {
  try {
    const { data } = await instance.get(process.env.CATALOGUES_API_URL);
    return data;
  } catch (error) {
    const message = (error as AxiosError<string>).response?.data;
    throw Error(message || "Error occurred, while getting catalogues");
  }
};
