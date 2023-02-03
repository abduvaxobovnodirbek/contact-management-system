import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PostDetail } from "../../types/api";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  endpoints: (build) => ({
    getSearchedPosts: build.query<PostDetail[], string>({
      query: (value) => `search/full-text-post?q=${value}`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.data;
      },
    }),
    getSelectedPosts: build.query<
      PostDetail[],
      { value: string; type: "tags" }
    >({
      query: (data) => `search/selected?${data.type}=${data.value}`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.data;
      },
    }),
  }),
});

export const { useGetSelectedPostsQuery, useGetSearchedPostsQuery } = searchApi;
