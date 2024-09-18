import { emptyApi } from "../../services/GetApiService";

export const booksApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ _uuid }) => ({ type: "Books", id: _uuid })),
              { type: "Books", id: "LIST" },
            ]
          : [{ type: "Books", id: "LIST" }],
    }),
    
    getBookById: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: (result, error, id) => [{ type: "Books", id }],
    }),
    deleteBookById: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Books", id },
        { type: "Books", id: "LIST" },
      ],
    }),


    postBook: builder.mutation({
      query: (data) => ({
        url: "/books",
        method: "POST",
        body: [data],
      }),
      invalidatesTags: [{ type: "Books", id: "LIST" }],
    }),

    bookStatusChange: builder.mutation({
      query: ({ id, status }) => ({
        url: `/books/${id}`, 
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: [{ type: "Books", id: "LIST" }],
    }),

    updateBook: builder.mutation({
      query: ({ id, ...datas }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: datas,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Books", id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useDeleteBookByIdMutation,
  usePostBookMutation,
  useBookStatusChangeMutation,
  useUpdateBookMutation
} = booksApi;
