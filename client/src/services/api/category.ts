import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "universal-cookie";
import { Category } from "../../types/api";

const cookie = new Cookies();


export const categoryApi = createApi({
  reducerPath: "category",
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
  tagTypes: ["typeCategory"],
  endpoints: (build) => ({
    createCategory: build.mutation<Category, Partial<Category>>({
      query: (body) => ({
        url: "categories",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "typeCategory", id: "LIST" }],
    }),
    getCategories: build.query<Category[], void>({
      query: () => "categories",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: any) => ({
                type: "typeCategory" as const,
                id,
              })),
              { type: "typeCategory", id: "LIST" },
            ]
          : [{ type: "typeCategory", id: "LIST" }],
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue.data;
      },
    }),
    deleteCategory: build.mutation<any, string>({
      query: (id) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "typeCategory", id: "LIST" }],
    }),
    editCategory: build.mutation<Category, Partial<Category>>({
      query: (data) => ({
        url: `categories/${data._id}`,
        method: "PUT",
        body: { name: data.name },
      }),
      invalidatesTags: [{ type: "typeCategory", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
