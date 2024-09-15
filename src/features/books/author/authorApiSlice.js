import { emptyApi } from "../../../services/GetApiService";

export const authorApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getAuthor: builder.query({
      query: () => "/author",
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ _uuid }) => ({ type: "Author", id: _uuid })),
              { type: "Author", id: "LIST" },
            ]
          : [{ type: "Author", id: "LIST" }],
    }),

    getAuthorById: builder.query({
      query: (id) => `/author/${id}`,
      providesTags: (result, error, id) => [{ type: "Author", id }],
    }),
    
    deleteAuthorById: builder.mutation({
      query: (id) => ({
        url: `/author/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Author", id },
        { type: "Author", id: "LIST" },
      ],
    }),

    postAuthor: builder.mutation({
      query: (data) => ({
        url: "/author",
        method: "POST",
        body: [data],
      }),
      invalidatesTags: [{ type: "Author", id: "LIST" }],
    }),

    AuthorStatusChange: builder.mutation({
      query: ({ id, status }) => ({
        url: `/author/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: [{ type: "Author", id: "LIST" }],
    }),

    updateAuthor: builder.mutation({
      query: ({ id, ...datas }) => ({
        url: `/author/${id}`,
        method: "PUT",
        body: datas,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Author", id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAuthorQuery,
  useGetAuthorByIdQuery,
  useDeleteAuthorByIdMutation,
  usePostAuthorMutation,
  useAuthorStatusChangeMutation,
  useUpdateAuthorMutation,
} = authorApi;
