import { configureStore } from "@reduxjs/toolkit";

import { IS_DEVELOPMENT } from "../const/common";
import { api } from "../services";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: IS_DEVELOPMENT,
});
