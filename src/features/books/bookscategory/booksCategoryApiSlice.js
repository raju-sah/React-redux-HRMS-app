import { emptyApi } from "../../../services/GetApiService";

export const bookCategoryApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getBookCategory: builder.query({
      query: () => "/book-categories",
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ _uuid }) => ({ type: "Book", id: _uuid })),
              { type: "Book", id: "LIST" },
            ]
          : [{ type: "Book", id: "LIST" }],
    }),

    getBookCategoryById: builder.query({
      query: (id) => `/book-categories/${id}`,
      providesTags: (result, error, id) => [{ type: "Book", id }],
    }),
    
    deleteBookCategoryById: builder.mutation({
      query: (id) => ({
        url: `/book-categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Book", id },
        { type: "Book", id: "LIST" },
      ],
    }),

    postBookCategory: builder.mutation({
      query: (data) => ({
        url: "/book-categories",
        method: "POST",
        body: [data],
      }),
      invalidatesTags: [{ type: "Book", id: "LIST" }],
    }),

    bookCategoryStatusChange: builder.mutation({
      query: ({ id, status }) => ({
        url: `/book-categories/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: [{ type: "Book", id: "LIST" }],
    }),

    updateBookCategory: builder.mutation({
      query: ({ id, ...datas }) => ({
        url: `/book-categories/${id}`,
        method: "PUT",
        body: datas,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Book", id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetBookCategoryQuery,
  useGetBookCategoryByIdQuery,
  useDeleteBookCategoryByIdMutation,
  usePostBookCategoryMutation,
  useBookCategoryStatusChangeMutation,
  useUpdateBookCategoryMutation,
} = bookCategoryApi;
