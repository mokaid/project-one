import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL } from "../const/common";

export const api = createApi({
  reducerPath: "api",
  tagTypes: [],
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: () => ({}),
});
