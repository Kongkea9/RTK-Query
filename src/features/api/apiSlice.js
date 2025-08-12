import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getDecryptedAccessToken } from "../../util/tokenUtil";

// // Define a service using a base URL and expected endpoints

const baseQueryCustom = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers) => {
    const accessToken = getDecryptedAccessToken();

    if (accessToken) {
      headers.set("authorization", accessToken);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: baseQueryCustom,
  endpoints: () => ({}),
});
