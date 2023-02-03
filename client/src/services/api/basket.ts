import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "universal-cookie";
import { PostDetail } from "../../types/api";

const cookie = new Cookies();

export const basketApi = createApi({
  reducerPath: "basketApi",
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
  tagTypes: ["basketList"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  endpoints: (build) => ({
    getBasket: build.query<PostDetail[], void>({
      query: () => `user/saved-posts`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: any) => ({
                type: "basketList" as const,
                id,
              })),
              { type: "basketList", id: "LIST" },
            ]
          : [{ type: "basketList", id: "LIST" }],
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.data;
      },
    }),
    insertToBasket: build.mutation<any, { postId: string }>({
      query: (body) => ({
        url: "user/saved-posts",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "basketList", id: "LIST" }],
    }),
    removeFromBasket: build.mutation<any, string>({
      query: (id) => ({
        url: `user/saved-posts/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "basketList", id: "LIST" }],
    }),
  }),
});

export const {
  useGetBasketQuery,
  useInsertToBasketMutation,
  useRemoveFromBasketMutation,
} = basketApi;
