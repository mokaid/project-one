import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import qs from "query-string";

import { API_BASE_URL, QUERY_STRING_ARRAY_FORMAT } from "../const/common";

export const api = createApi({
  reducerPath: "api",
  tagTypes: [],
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    paramsSerializer: (params) =>
      qs.stringify(params, {
        arrayFormat: QUERY_STRING_ARRAY_FORMAT,
        skipEmptyString: true,
        skipNull: true,
      }),
  }),
  endpoints: () => ({}),
});
