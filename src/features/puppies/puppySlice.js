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
    getPlayers: build.query({
      query: () => "players",
      providesTags: ["Puppy"],
      transformResponse: (response) => response.data,
      transformErrorResponse: (error) => error.data,
    }),
    getPlayer: build.query({
      query: (puppyId) => `players/${puppyId}`,
      providesTags: ["Puppy"],
      transformResponse: (response) => response.data,
      transformErrorResponse: (error) => error.data,
    }),
    addPlayer: build.mutation({
      query: (newPuppy) => ({
        url: "players",
        method: "POST",
        body: newPuppy,
      }),
      invalidatesTags: ["Puppy"],
      transformResponse: (response) => response.data,
      transformErrorResponse: (error) => error.data,
    }),
    deletePlayer: build.mutation({
      query: (puppyId) => ({
        url: `players/${puppyId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Puppy"],
      transformResponse: (response) => response.data,
      transformErrorResponse: (error) => error.data,
    }),
  }),
});

export const {
  useGetPlayersQuery,
  useGetPlayerQuery,
  useAddPlayerMutation,
  useDeletePlayerMutation,
} = puppyApi;
export default puppyApi;
