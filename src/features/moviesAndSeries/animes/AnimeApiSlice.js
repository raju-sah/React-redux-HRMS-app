import { emptyApi } from "../../../services/GetApiService";

export const animeApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnimes: builder.query({
      query: () => "/animes",
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ _uuid }) => ({ type: "Animes", id: _uuid })),
              { type: "Animes", id: "LIST" },
            ]
          : [{ type: "Animes", id: "LIST" }],
    }),
    
    getAnimeById: builder.query({
      query: (id) => `/animes/${id}`,
      providesTags: (result, error, id) => [{ type: "Animes", id }],
    }),
    deleteAnimeById: builder.mutation({
      query: (id) => ({
        url: `/animes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Animes", id },
        { type: "Animes", id: "LIST" },
      ],
    }),


    postAnime: builder.mutation({
      query: (data) => ({
        url: "/animes",
        method: "POST",
        body: [data],
      }),
      invalidatesTags: [{ type: "Animes", id: "LIST" }],
    }),

    animeStatusChange: builder.mutation({
      query: ({ id, status }) => ({
        url: `/animes/${id}`, 
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: [{ type: "Animes", id: "LIST" }],
    }),

    updateAnime: builder.mutation({
      query: ({ id, ...datas }) => ({
        url: `/animes/${id}`,
        method: "PUT",
        body: datas,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Animes", id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAnimesQuery,
  useGetAnimeByIdQuery,
  useDeleteAnimeByIdMutation,
  usePostAnimeMutation,
  useAnimeStatusChangeMutation,
  useUpdateAnimeMutation
} = animeApi;
