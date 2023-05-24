import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  PersistConfig,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { REDUCERS_NAMES } from "@constants";
import { rootReducer } from "./rootReducer";
import { listener } from "./middlewares";

import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// fixes redux-persist failed to create sync storage. falling back to noop storage - https://github.com/vercel/next.js/discussions/15687
const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem() {
      return Promise.resolve();
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

// configuring store

const persistConfig: PersistConfig<unknown, any, any, any> = {
  key: "root",
  storage,
  blacklist: [REDUCERS_NAMES.VACANCIES_FORM, REDUCERS_NAMES.REQUEST_INFO],
};

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).prepend(listener.middleware),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
