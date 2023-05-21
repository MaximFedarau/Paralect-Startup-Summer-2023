import { AxiosError } from "axios";

import { createAPIInstance } from "./instance";

export const getVacancies = async () => {
  const instance = createAPIInstance();
  try {
    const { data } = await instance.get(process.env.VACANCIES_API_URL, {
      headers: {
        "X-Api-App-Id": process.env.CLIENT_SECRET,
      },
    });
    return data;
  } catch (error) {
    const message = (error as AxiosError<string>).response?.data;
    throw Error(message || "Error occurred, while getting vacancies");
  }
};
