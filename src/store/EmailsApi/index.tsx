import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getDecodeUrlUserEmail } from '../../helpers/GetDecodeUrlUserEmail';

export const emailsApi = createApi({
  reducerPath: 'emailsApi',
  tagTypes: ['FavoriteList'],
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getAllEmails: builder.query<any, { category: string; inputValue: string }>({
      query: (args) => `emails?category=${args.category}&search=${args.inputValue || ''}`,
    }),
    getEmail: builder.query<any>({
      query: (email: string) => `email?user=${email || getDecodeUrlUserEmail()}`,
    }),
    getFavoriteList: builder.query<any>({
      query: () => `/getFavorite`,
      providesTags: ['FavoriteList'],
    }),
    addMessageToFavorite: builder.mutation({
      query: (body) => ({
        url: 'addFavorite',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['FavoriteList'],
    }),
  }),
});

export const {
  useGetAllEmailsQuery,
  useLazyGetAllEmailsQuery,
  useGetEmailQuery,
  useAddMessageToFavoriteMutation,
  useGetFavoriteListQuery,
  useLazyGetFavoriteListQuery,
} = emailsApi;
