import { emptyApi } from "../../../services/GetApiService";

export const movieApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: () => "/movies",
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ _uuid }) => ({ type: "Movies", id: _uuid })),
              { type: "Movies", id: "LIST" },
            ]
          : [{ type: "Movies", id: "LIST" }],
    }),
    
    getMovieById: builder.query({
      query: (id) => `/movies/${id}`,
      providesTags: (result, error, id) => [{ type: "Movies", id }],
    }),
    deleteMovieById: builder.mutation({
      query: (id) => ({
        url: `/movies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Movies", id },
        { type: "Movies", id: "LIST" },
      ],
    }),


    postMovie: builder.mutation({
      query: (data) => ({
        url: "/movies",
        method: "POST",
        body: [data],
      }),
      invalidatesTags: [{ type: "Movies", id: "LIST" }],
    }),

    movieStatusChange: builder.mutation({
      query: ({ id, status }) => ({
        url: `/movies/${id}`, 
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: [{ type: "Movies", id: "LIST" }],
    }),

    updateMovie: builder.mutation({
      query: ({ id, ...datas }) => ({
        url: `/movies/${id}`,
        method: "PUT",
        body: datas,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Movies", id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMoviesQuery,
  useGetMovieByIdQuery,
  useDeleteMovieByIdMutation,
  usePostMovieMutation,
  useMovieStatusChangeMutation,
  useUpdateMovieMutation
} = movieApi;
