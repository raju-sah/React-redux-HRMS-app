// services/emptyApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL, TOKEN } from '../config';

// Initialize an empty API service that we'll inject endpoints into later as needed
export const emptyApi = createApi({
  baseQuery: fetchBaseQuery({ 
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      // Add authorization header
      headers.set('Authorization', `Bearer ${TOKEN}`);
      return headers;
    },
  }),
  endpoints: () => ({}), // Start with no endpoints
});
