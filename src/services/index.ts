import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import qs from "query-string";

import { API_BASE_URL, QUERY_STRING_ARRAY_FORMAT } from "../const/common";

export const api = createApi({
  reducerPath: "api",
  tagTypes: [],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://f50048686d07.ngrok.app/",
    paramsSerializer: (params) =>
      qs.stringify(params, {
        arrayFormat: QUERY_STRING_ARRAY_FORMAT,
        skipEmptyString: true,
        skipNull: true,
      }),
  }),
  endpoints: (builder) => ({
    getAllEvents: builder.mutation({
      query: (body: any) => ({
        url: "query-events",
        method: "POST",
        body,
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
  }),
});

export const { useGetAllEventsMutation } = api;
