import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const fireStoreApi = createApi({
  reducerPath: 'fireStoreApi',
  baseQuery: fetchBaseQuery({ baseUrl: "https://firestore.googleapis.com/v1/"}),
  endpoints: (builder) => ({
    getQuestionData: builder.query({
      query: () => "projects/hafun-4d476/databases/(default)/documents/question/",
    }),
    getUserData: builder.query({
      query: (uid) => `projects/hafun-4d476/databases/(default)/documents/user/`
    })
  }),
})

export const { useGetQuestionDataQuery } = fireStoreApi;
export const { useGetUserDataQuery } = fireStoreApi;

export default fireStoreApi;
