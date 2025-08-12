import { apiSlice } from "../api/apiSlice";

// NOTE: these are the _SAME_ API reference!
const productApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
    getProductById: build.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
    }),

    createProduct: build.mutation({
      query: (createProduct) => ({
        url: `/products`,
        method: "POST",
        body: createProduct,
      }),
    }),

    updateProduct: build.mutation({
      query: ({ uuid, updatedProduct }) => ({
        url: `/products/${uuid}`,
        method: "PUT",
        body: updatedProduct,
      }),
    }),

    deleteProduct:build.mutation({
      query:(uuid)=>({
        url:`/products/${uuid}`,
        method: "DELETE",
      })
    })
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
