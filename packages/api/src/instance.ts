import axios, { InternalAxiosRequestConfig } from "axios";

const getTokens = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.API_URL}${process.env.ACCESS_TOKEN_API_URL}`,
      {
        params: {
          login: process.env.LOGIN,
          password: process.env.PASSWORD,
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          hr: process.env.HR,
        },
        headers: {
          "x-secret-key": process.env.SECRET_KEY,
        },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const createAPIInstance = () => {
  const instance = axios.create({
    baseURL: process.env.API_URL,
    headers: {
      "x-secret-key": process.env.SECRET_KEY,
      "X-Api-App-Id": process.env.CLIENT_SECRET,
    },
  });

  // create a new token for each request
  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const { access_token } = await getTokens();
      config.headers.Authorization = `Bearer ${access_token}`;
      return config;
    }
  );

  return instance;
};
