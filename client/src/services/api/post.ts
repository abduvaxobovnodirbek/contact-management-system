import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "universal-cookie";
import { FormValues, PostDetail } from "../../types/api";

const cookie = new Cookies();

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = cookie.get("token");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Post", "PostDetail"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  endpoints: (build) => ({
    getPosts: build.query<PostDetail[], void>({
      query: (page) => `posts`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.data;
      },
    }),

    getTags: build.query<string[], void>({
      query: () => "posts/tags",
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.tags;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: any) => ({ type: "Post" as const, id })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),
    getPostDetail: build.query<PostDetail, string>({
      query: (id) => `posts/${id}`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.data;
      },
      providesTags: (result) =>
        result
          ? [
              {
                type: "PostDetail" as const,
                id: result._id,
              },
              { type: "PostDetail", id: "LIST" },
            ]
          : [{ type: "PostDetail", id: "LIST" }],
    }),

    createPost: build.mutation<any, FormValues>({
      query: (body) => ({
        url: "posts",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    deletePost: build.mutation<any, string>({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        { type: "Post", id: "LIST" },
        { type: "PostDetail", id: "LIST" },
      ],
    }),
    editPost: build.mutation<any, FormValues>({
      query: (body) => ({
        url: `posts/${body.post_id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [
        { type: "Post", id: "LIST" },
        { type: "PostDetail", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useGetTagsQuery,
  useGetPostDetailQuery,
  useDeletePostMutation,
  useEditPostMutation,
} = postApi;
