import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "universal-cookie";
import { ContactDetail } from "../../types/api";

const cookie = new Cookies();

export const contactApi = createApi({
  reducerPath: "contactApi",
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
  tagTypes: ["contactList"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  endpoints: (build) => ({
    getContact: build.query<ContactDetail[], void>({
      query: () => `contacts`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: any) => ({
                type: "contactList" as const,
                id,
              })),
              { type: "contactList", id: "LIST" },
            ]
          : [{ type: "contactList", id: "LIST" }],
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.data;
      },
    }),
    postContact: build.mutation<any, Partial<ContactDetail>>({
      query: (body) => ({
        url: "contacts",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "contactList", id: "LIST" }],
    }),
    removeContact: build.mutation<any, string>({
      query: (id) => ({
        url: `contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "contactList", id: "LIST" }],
    }),
  }),
});

export const {
  useGetContactQuery,
  usePostContactMutation,
  useRemoveContactMutation,
} = contactApi;
