import { emptyApi } from "../../../services/GetApiService";

export const genreApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getGenres: builder.query({
      query: () => "/genres",
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ _uuid }) => ({ type: "Genres", id: _uuid })),
              { type: "Genres", id: "LIST" },
            ]
          : [{ type: "Genres", id: "LIST" }],
    }),
    
    getGenreById: builder.query({
      query: (id) => `/genres/${id}`,
      providesTags: (result, error, id) => [{ type: "Genres", id }],
    }),
    deleteGenreById: builder.mutation({
      query: (id) => ({
        url: `/genres/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Genres", id },
        { type: "Genres", id: "LIST" },
      ],
    }),


    postGenre: builder.mutation({
      query: (data) => ({
        url: "/genres",
        method: "POST",
        body: [data],
      }),
      invalidatesTags: [{ type: "Genres", id: "LIST" }],
    }),

    genreStatusChange: builder.mutation({
      query: ({ id, status }) => ({
        url: `/genres/${id}`, 
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: [{ type: "Genres", id: "LIST" }],
    }),

    updateGenre: builder.mutation({
      query: ({ id, ...datas }) => ({
        url: `/genres/${id}`,
        method: "PUT",
        body: datas,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Genres", id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetGenresQuery,
  useGetGenreByIdQuery,
  useDeleteGenreByIdMutation,
  usePostGenreMutation,
  useGenreStatusChangeMutation,
  useUpdateGenreMutation
} = genreApi;
