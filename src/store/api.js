import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COHORT_CODE = "2407-FTB-ET-WEB-PT";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${COHORT_CODE}/`;

// TODO: configure createApi to use API_URL as the base URL
// TODO: add "Puppy" as a tag type.
const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Puppy"],
  endpoints: (builder) => ({
    getPlayers: builder.query({
      query: () => "puppies",
      providesTags: ["Puppy"],
    }),
  }),
});

export const { useGetPuppiesQuery, useAddPuppyMutation } = api;
export default api;
