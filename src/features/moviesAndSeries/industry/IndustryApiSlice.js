import { emptyApi } from "../../../services/GetApiService";

export const industryApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getIndustrys: builder.query({
      query: () => "/industries",
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ _uuid }) => ({ type: "Industries", id: _uuid })),
              { type: "Industries", id: "LIST" },
            ]
          : [{ type: "Industries", id: "LIST" }],
    }),
    
    getIndustryById: builder.query({
      query: (id) => `/industries/${id}`,
      providesTags: (result, error, id) => [{ type: "Industries", id }],
    }),
    deleteIndustryById: builder.mutation({
      query: (id) => ({
        url: `/industries/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Industries", id },
        { type: "Industries", id: "LIST" },
      ],
    }),


    postIndustry: builder.mutation({
      query: (data) => ({
        url: "/industries",
        method: "POST",
        body: [data],
      }),
      invalidatesTags: [{ type: "Industries", id: "LIST" }],
    }),

    industryStatusChange: builder.mutation({
      query: ({ id, status }) => ({
        url: `/industries/${id}`, 
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: [{ type: "Industries", id: "LIST" }],
    }),

    updateIndustry: builder.mutation({
      query: ({ id, ...datas }) => ({
        url: `/industries/${id}`,
        method: "PUT",
        body: datas,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Industries", id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetIndustrysQuery,
  useGetIndustryByIdQuery,
  useDeleteIndustryByIdMutation,
  usePostIndustryMutation,
  useIndustryStatusChangeMutation,
  useUpdateIndustryMutation
} = industryApi;
