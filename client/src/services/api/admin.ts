import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "universal-cookie";
import { PostDetail, User } from "../../types/api";

const cookie = new Cookies();


export const adminControlApi = createApi({
  reducerPath: "adminControlApi",
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
  
  tagTypes: ["Users", "Posts"],

  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  endpoints: (build) => ({
    getAllUsers: build.query<User[], void>({
      query: () => "user/all",
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.data;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: any) => ({
                type: "Users" as const,
                id,
              })),
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
    }),

    getAllPosts: build.query<PostDetail[], void>({
      query: () => "posts",
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.data;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: any) => ({
                type: "Posts" as const,
                id,
              })),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),

    deleteUser: build.mutation<any, string>({
      query: (id) => ({
        url: `user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    changeUserStatus: build.mutation<User, { status: boolean; id: string }>({
      query: (data) => ({
        url: `user/status/${data.id}`,
        method: "PATCH",
        body: { status: data.status },
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useChangeUserStatusMutation,
  useGetAllPostsQuery,
} = adminControlApi;
