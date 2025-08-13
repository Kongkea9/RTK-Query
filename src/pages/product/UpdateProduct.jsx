import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../features/product/productSlice";

const productSchema = z.object({
  name: z.string().nonempty("name is required"),

  stockQuantity: z
    .union([z.string(), z.number()])
    .refine((val) => val !== "" && val !== null && val !== undefined, {
      message: "Stock Quantity is required",
    })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: "Stock Quantity must be a valid number",
    })
    .refine((val) => val > 0, {
      message: "Stock Quantity must be greater than 0",
    }),

  priceIn: z
    .union([z.string(), z.number()])
    .refine((val) => val !== "" && val !== null && val !== undefined, {
      message: "Price In is required",
    })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: "Price In must be a valid number",
    })
    .refine((val) => val > 0, {
      message: "Price In must be greater than 0",
    }),

  priceOut: z
    .union([z.string(), z.number()])
    .refine((val) => val !== "" && val !== null && val !== undefined, {
      message: "Price Out is required",
    })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: "Price Out must be a valid number",
    })
    .refine((val) => val > 0, {
      message: "Price Out must be greater than 0",
    }),

  description: z.string().nonempty("Description is required"),
  thumbnail: z.string().nonempty("Thumbnail is required"),
});

export default function updateProduct() {
  const [updateProduct] = useUpdateProductMutation();

  const navigate = useNavigate();

  const { id } = useParams();

  const { data: existData, isPending, isError } = useGetProductByIdQuery(id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      stockQuantity: 0,
      priceIn: 0,

      priceOut: 0,

      thumbnail: "",
    },
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    if (existData) {
      reset({
        name: existData.name,
        stockQuantity: existData.stockQuantity,
        priceOut: existData.priceOut,
        thumbnail: existData.thumbnail,
        description: existData.description,
      });
    }
  }, [existData, reset]);

  const onSubmit = async (data) => {
    try {
      const productData = {
        ...data,

        discount: 15,
        color: [
          {
            color: "",
            images: [data.thumbnail],
          },
        ],
        availability: true,
        images: [data.thumbnail],
        categoryUuid: "dc071830-ce8a-40e2-ad51-3c1adeeb02cb",
        supplierUuid: "0980127a-dc6d-487d-b166-957bcda2540d",
        brandUuid: "8265f3c7-9aea-498c-88b2-9e1bacb4f716",
      };

      await updateProduct({ uuid: id, updatedProduct: productData }).unwrap();

      toast.success("Product updated successfully!");
      setTimeout(() => navigate("/products"), 900);
    } catch (err) {
      console.error("Product update error:", err);
      toast.error("Failed to update product. Please try again.");
    }
  };

  return (
    <section className="flex justify-center items-center bg-teal-600 w-full  h-[120vh] mx-auto">
      <ToastContainer />

      <div className="w-full max-w-md p-6 sm:p-8 bg-white border border-gray-200 rounded-2xl shadow-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          <h5 className="text-xl font-medium text-teal-600 text-center">
            Update Product
          </h5>

          <div>
            <label className="block mb-1 text-sm text-gray-700">Name</label>
            <input
              {...register("name")}
              type="text"
              placeholder="Product name"
              className="input w-full p-2 border rounded-lg text-sm"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-700">Quantity</label>
            <input
              {...register("stockQuantity")}
              type="number"
              placeholder="Product Stock Quantity"
              className="input w-full p-2 border rounded-lg text-sm"
            />
            {errors.stockQuantity && (
              <p className="text-red-500 text-sm">
                {errors.stockQuantity.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-700">PriceIn</label>
            <input
              {...register("priceIn")}
              type="number"
              placeholder="Product priceIn"
              className="input w-full p-2 border rounded-lg text-sm"
            />
            {errors.priceIn && (
              <p className="text-red-500 text-sm">{errors.priceIn.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-700">PriceOut</label>
            <input
              {...register("priceOut")}
              type="number"
              placeholder="Product priceOut"
              className="input w-full p-2 border rounded-lg text-sm"
            />
            {errors.priceOut && (
              <p className="text-red-500 text-sm">{errors.priceOut.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-700">
              thumbnail
            </label>
            <textarea
              {...register("thumbnail")}
              placeholder="Product thumbnail"
              className="input w-full p-2 border rounded-lg text-sm"
            />
            {errors.thumbnail && (
              <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-700">
              Description
            </label>
            <textarea
              {...register("description")}
              placeholder="Product description"
              className="input w-full p-2 border rounded-lg text-sm"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg text-sm transition"
          >
            Update Product
          </button>
        </form>
      </div>
    </section>
  );
}
