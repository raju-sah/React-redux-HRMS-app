import { emptyApi } from "../../../services/GetApiService";

export const webSeriesApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getWebSeries: builder.query({
      query: () => "/web-series",
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ _uuid }) => ({ type: "WebSeries", id: _uuid })),
              { type: "WebSeries", id: "LIST" },
            ]
          : [{ type: "WebSeries", id: "LIST" }],
    }),
    
    getWebSeriesById: builder.query({
      query: (id) => `/web-series/${id}`,
      providesTags: (result, error, id) => [{ type: "WebSeries", id }],
    }),
    deleteWebSeriesById: builder.mutation({
      query: (id) => ({
        url: `/web-series/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "WebSeries", id },
        { type: "WebSeries", id: "LIST" },
      ],
    }),


    postWebSeries: builder.mutation({
      query: (data) => ({
        url: "/web-series",
        method: "POST",
        body: [data],
      }),
      invalidatesTags: [{ type: "WebSeries", id: "LIST" }],
    }),

    webSeriesStatusChange: builder.mutation({
      query: ({ id, status }) => ({
        url: `/web-series/${id}`, 
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: [{ type: "WebSeries", id: "LIST" }],
    }),

    updateWebSeries: builder.mutation({
      query: ({ id, ...datas }) => ({
        url: `/web-series/${id}`,
        method: "PUT",
        body: datas,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "WebSeries", id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetWebSeriesQuery,
  useGetWebSeriesByIdQuery,
  useDeleteWebSeriesByIdMutation,
  usePostWebSeriesMutation,
  useWebSeriesStatusChangeMutation,
  useUpdateWebSeriesMutation
} = webSeriesApi;
