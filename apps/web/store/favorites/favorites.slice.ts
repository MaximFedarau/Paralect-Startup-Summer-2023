import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  favorites: string[];
}

const initialState: InitialState = {
  favorites: [],
};

export const favoritesSlice = createSlice({
  name: "favoritesSlice",
  initialState,
  reducers: {
    addFavorite: (state, { payload }: PayloadAction<string>) => {
      state.favorites.push(payload);
    },
    removeFavorite: (state, { payload }: PayloadAction<string>) => {
      state.favorites = state.favorites.filter((id) => id != payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
