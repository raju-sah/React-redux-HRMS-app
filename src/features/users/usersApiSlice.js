import { emptyApi } from "../../services/GetApiService";

export const usersApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ _uuid }) => ({ type: "User", id: _uuid })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    deleteUserById: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),

    
    postUser: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: [user],
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useDeleteUserByIdMutation,
  usePostUserMutation,
} = usersApi;
