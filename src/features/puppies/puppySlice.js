import api from "../../store/api";

/*
TODO: Define the following 4 endpoints:
  1. getpuppies (query)
  2. getPuppy (query)
  3. addPuppy (mutation)
  4. deletePuppy (mutation)

The query endpoints should provide the "Puppy" tag.
The mutation endpoints should invalidate the "Puppy" tag.

(Optional) TODO: Write `transformResponse` and `transformErrorResponse`
functions for each endpoint.
*/

const puppyApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPuppies: build.query({
      query: () => "puppies",
      providesTags: ["Puppy"],
      transformResponse: (response) => response.data,
      transformErrorResponse: (error) => error.data,
    }),
    getPuppy: build.query({
      query: (puppyId) => `puppies/${puppyId}`,
      providesTags: ["Puppy"],
      transformResponse: (response) => response.data,
      transformErrorResponse: (error) => error.data,
    }),
    addPuppy: build.mutation({
      query: (newPuppy) => ({
        url: "puppies",
        method: "POST",
        body: newPuppy,
      }),
      invalidatesTags: ["Puppy"],
      transformResponse: (response) => response.data,
      transformErrorResponse: (error) => error.data,
    }),
    deletePuppy: build.mutation({
      query: (puppyId) => ({
        url: `puppies/${puppyId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Puppy"],
      transformResponse: (response) => response.data,
      transformErrorResponse: (error) => error.data,
    }),
  }),
});

export const {
  useGetPuppiesQuery,
  useGetPuppyQuery,
  useAddPuppyMutation,
  useDeletePuppyMutation,
} = puppyApi;
export default puppyApi;
