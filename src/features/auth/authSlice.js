import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: `/auth/login`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }),
    }),
    register: build.mutation({
      query: (body) => ({
        url: `/users/user-signup?emailVerified=false`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }),
    }),

    verifyEmail: build.query({
      query: (token) => ({
        url: `/users/verify-email?token=${token}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyEmailQuery,     
  useLazyVerifyEmailQuery, 

} = authApi;
