import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUploadFileMutation } from "../../features/file/fileSlice";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateProductMutation } from "../../features/product/productSlice";

const productSchema = z.object({
  name: z.string().nonempty("name is required"),

  stockQuantity: z
    .string()
    .nonempty("Stock Quantity is required")
    .transform(Number)
    .refine((val) => !isNaN(val), {
      message: "Stock Quantity must be a valid number",
    })
    .refine((val) => val > 0, {
      message: "Stock Quantity must be greater than 0",
    }),

  priceIn: z
    .string()
    .nonempty("PriceIn is required")
    .transform(Number)
    .refine((val) => !isNaN(val), { message: "PriceIn must be a valid number" })
    .refine((val) => val > 0, { message: "PriceIn must be greater than 0" }),
  priceOut: z
    .string()
    .nonempty("PriceOut is required")
    .transform(Number)
    .refine((val) => !isNaN(val), {
      message: "PriceOut must be a valid number",
    })
    .refine((val) => val > 0, { message: "PriceOut must be greater than 0" }),

  description: z.string().nonempty("Description is required"),
  thumbnail: z.string().nonempty("Thumbnail is required"),
});

export default function CreateProduct() {
  const [uploadFile] = useUploadFileMutation();
  const [createProduct] = useCreateProductMutation();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",

      stockQuantity: "",
      priceIn: "",
      priceOut: "",

      thumbnail: "",
    },
    resolver: zodResolver(productSchema),
  });
  const onSubmit = async (data) => {
    try {
      const productData = {
        ...data,

        computerSpec: {
          processor: "N/A",
          ram: "N/A",
          storage: "N/A",
          gpu: "N/A",
          os: "N/A",
          screenSize: "N/A",
          battery: "N/A",
        },

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

      await createProduct(productData).unwrap();

      console.log(productData);
      toast.success("Product created successfully!");
      setTimeout(() => navigate("/products"), 900);
    } catch (err) {
      console.error("Product creation error:", err);
      toast.error("Failed to create product. Please try again.");
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
            Create Product
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
            Create Product
          </button>
        </form>
      </div>
    </section>
  );
}

// import React, { useState } from "react";
// // import { useCreateProductMutation } from "../../features/product/productSlice2";
// import { useUploadFileMutation } from "../../features/file/fileSlice";
// import { useCreateProductMutation } from "../../features/product/productSlice";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// const schema = z.object({
//   title: z.string().nonempty("Title is required"),
//   description: z.string().nonempty("Title is required"),
//   // price: z
//   //   .number({ invalid_type_error: "Price must be a number" })
//   //   .positive("Price must be greater than 0"),
//   // categoryId: z
//   //   .number({ invalid_type_error: "Category Id must be a number" })
//   //   .positive("Category Id must be greater than 0"),
// });

// export default function CreateProduct() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       title: "",
//       description: "",
//       priceOut: "",
//     },
//   });
//   const [createProduct, { isLoading }] = useCreateProductMutation();
//   const [image, setImage] = useState(null); // use to store meta data
//   const [preview, setPreview] = useState(null);
//   const [uploadFile] = useUploadFileMutation();
//   const [formData, setFormData] = useState({
//     title: "",
//     priceOut: "",
//     description: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]:
//         name === "priceOut" || name === "categoryId" ? Number(value) : value,
//     }));
//   };

//   const handleImagePreview = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setImage(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   // const onSubmit = async (data) => {

//   //   try {
//   //     let imageUrls = [];

//   //     // Upload image first if available
//   //     if (image) {
//   //       const imageForm = new FormData();
//   //       imageForm.append("file", image);
//   //       const res = await uploadFile(imageForm).unwrap();
//   //       imageUrls = [res.location];
//   //     }

//   //     const submitData = {
//   //       // ...data,

//   //       computerSpec: {
//   //         processor: "N/A",
//   //         ram: "N/A",
//   //         storage: "N/A",
//   //         gpu: "N/A",
//   //         os: "N/A",
//   //         screenSize: "N/A",
//   //         battery: "N/A",
//   //       },

//   //       discount: 15,

//   //       color: [
//   //         {
//   //           color: "",
//   //           images: [data.thumbnail],
//   //         },
//   //       ],
//   //       availability: true,
//   //       images: [data.thumbnail],
//   //       categoryUuid: "dc071830-ce8a-40e2-ad51-3c1adeeb02cb",
//   //       supplierUuid: "0980127a-dc6d-487d-b166-957bcda2540d",
//   //       brandUuid: "8265f3c7-9aea-498c-88b2-9e1bacb4f716",

//   //       thumbnail:
//   //         imageUrls.length > 0 ? imageUrls : ["https://placehold.co/600x400"],
//   //     };

//   //     console.log(submitData)
//   //     // await createProduct(submitData).unwrap();
//   //   } catch (error) {
//   //     console.error("Create failed:", error);
//   //   }
//   // };

//   const onSubmit = async (data) => {
//     try {
//       let imageUrls = [];

//       // Upload image first if available
//       if (image) {
//         const imageForm = new FormData();
//         imageForm.append("file", image);
//         const res = await uploadFile(imageForm).unwrap();
//         imageUrls = [res.location];
//       }

//       const productData = {
//         ...data,

//         computerSpec: {
//           processor: "N/A",
//           ram: "N/A",
//           storage: "N/A",
//           gpu: "N/A",
//           os: "N/A",
//           screenSize: "N/A",
//           battery: "N/A",
//         },

//         thumbnail:
//           imageUrls.length > 0 ? imageUrls : ["https://placehold.co/600x400"],

//         discount: 15,
//         priceIn:0,
//         stockQuantity :0,

//         color: [
//           {
//             color: "",
//             images: [data.thumbnail],
//           },
//         ],
//         availability: true,
//         images: [data.thumbnail],
//         categoryUuid: "dc071830-ce8a-40e2-ad51-3c1adeeb02cb",
//         supplierUuid: "0980127a-dc6d-487d-b166-957bcda2540d",
//         brandUuid: "8265f3c7-9aea-498c-88b2-9e1bacb4f716",
//       };

//       await createProduct(productData).unwrap();

//       console.log(productData);

//       setTimeout(() => navigate("/products"), 900);
//     } catch (err) {
//       console.error("Product creation error:", err);
//     }
//   };

//   () => {
//     const [filterText, setFilterText] = useState("");
//     const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
//     const filteredItems = data.content.filter(
//       (item) =>
//         item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
//     );
//     const subHeaderComponentMemo = useMemo(() => {
//       const handleClear = () => {
//         if (filterText) {
//           setResetPaginationToggle(!resetPaginationToggle);
//           setFilterText("");
//         }
//       };
//       return (
//         <FilterComponent
//           on
//           Filter={(e) => setFilterText(e.target.value)}
//           onClear={handleClear}
//           filterText={filterText}
//         />
//       );
//     }, [filterText, resetPaginationToggle]);
//   };

//   return (
//     <div className="m-10">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="flex flex-col gap-3 max-w-md mx-auto"
//       >
//         <div className="flex flex-col">
//           <input
//             {...register("title")}
//             className="px-2.5 py-2.5 border border-slate-400 rounded-xl"
//             placeholder="Title"
//             type="text"
//             name="title"
//           />
//           {errors.title && (
//             <p className="text-red-500">{errors.title.message}</p>
//           )}
//         </div>
//         <div className="flex flex-col">
//           <input
//             {...register("description")}
//             className="px-2.5 py-2.5 border border-slate-400 rounded-xl"
//             placeholder="Description"
//             type="text"
//             name="description"
//           />
//           {errors.description && (
//             <p className="text-red-500">{errors.description.message}</p>
//           )}
//         </div>
//         <div className="flex flex-col">
//           <input
//             {...register("priceOut", { valueAsNumber: true })}
//             className="px-2.5 py-2.5 border border-slate-400 rounded-xl"
//             placeholder="Price"
//             type="text"
//             name="price"
//           />
//           {errors.price && (
//             <p className="text-red-500">{errors.price.message}</p>
//           )}
//         </div>{" "}
//         {preview != null && (
//           <div class="flex items-center justify-center w-full">
//             <label
//               for="dropzone-file"
//               class="flex rounded-2xl flex-col items-center justify-center w-64  h-64 border-2 border-gray-300 border-dashed  cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
//             >
//               <img
//                 className=" w-64 rounded-2xl h-64 object-cover"
//                 src={preview}
//               />
//               <input
//                 onChange={(e) => handleImagePreview(e)}
//                 id="dropzone-file"
//                 type="file"
//                 class="hidden"
//                 accept="image/jpeg,image/png,image/webp,image/jpg"
//               />
//             </label>
//           </div>
//         )}
//         {preview == null && (
//           <div class="flex items-center justify-center w-full">
//             <label
//               for="dropzone-file"
//               class="flex flex-col items-center justify-center w-64 rounded-2xl h-64 border-2 border-gray-300 border-dashed  cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
//             >
//               <div class="flex flex-col items-center justify-center pt-5 pb-6">
//                 <svg
//                   class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 20 16"
//                 >
//                   <path
//                     stroke="currentColor"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     stroke-width="2"
//                     d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//                   />
//                 </svg>
//                 <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                   <span class="font-semibold">Click to upload</span> or drag and
//                   drop
//                 </p>
//               </div>
//               <input
//                 onChange={(e) => handleImagePreview(e)}
//                 id="dropzone-file"
//                 type="file"
//                 class="hidden"
//                 accept="image/jpeg,image/png,image/webp,image/jpg"
//               />
//             </label>
//           </div>
//         )}
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="bg-blue-500 text-white cursor-pointer px-4 py-2 rounded"
//         >
//           {isLoading ? "Creating..." : "Create Product"}
//         </button>
//       </form>
//     </div>
//   );
// }

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useUploadFileMutation } from "../../features/file/fileSlice";
// import { useNavigate } from "react-router";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useCreateProductMutation } from "../../features/product/productSlice";

// const productSchema = z.object({
//   name: z.string().nonempty("Name is required"),
//   stockQuantity: z
//     .string()
//     .nonempty("Stock Quantity is required")
//     .transform(Number)
//     .refine((val) => !isNaN(val), { message: "Stock Quantity must be a number" })
//     .refine((val) => val > 0, { message: "Stock Quantity must be greater than 0" }),
//   priceIn: z
//     .string()
//     .nonempty("PriceIn is required")
//     .transform(Number)
//     .refine((val) => !isNaN(val), { message: "PriceIn must be a number" })
//     .refine((val) => val > 0, { message: "PriceIn must be greater than 0" }),
//   priceOut: z
//     .string()
//     .nonempty("PriceOut is required")
//     .transform(Number)
//     .refine((val) => !isNaN(val), { message: "PriceOut must be a number" })
//     .refine((val) => val > 0, { message: "PriceOut must be greater than 0" }),
//   description: z.string().nonempty("Description is required"),
//   thumbnail: z.string().nonempty("Thumbnail is required"),
// });

// export default function CreateProduct() {
//   const [uploadFile] = useUploadFileMutation();
//   const [createProduct] = useCreateProductMutation();
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const navigate = useNavigate();

//   const { register, handleSubmit, formState: { errors } } = useForm({
//     defaultValues: {
//       name: "",
//       description: "",
//       stockQuantity: "",
//       priceIn: "",
//       priceOut: "",
//       thumbnail: "",
//     },
//     resolver: zodResolver(productSchema),
//   });

//   const onSubmit = async (data) => {
//     try {

//       const productData = {
//         ...data,
//         computerSpec: {
//           processor: "N/A",
//           ram: "N/A",
//           storage: "N/A",
//           gpu: "N/A",
//           os: "N/A",
//           screenSize: "N/A",
//           battery: "N/A",
//         },
//         discount: 15,
//         color: [
//           {
//             color: "",
//             images: [data.thumbnail],
//           },
//         ],
//         availability: true,
//         images: [data.thumbnail],
//         categoryUuid: "dc071830-ce8a-40e2-ad51-3c1adeeb02cb",
//         supplierUuid: "0980127a-dc6d-487d-b166-957bcda2540d",
//         brandUuid: "8265f3c7-9aea-498c-88b2-9e1bacb4f716",
//       };

//       await createProduct(productData).unwrap();
//       toast.success("Product created successfully!");
//       setTimeout(() => navigate("/products"), 900);
//     } catch (err) {
//       console.error("Product creation error:", err);
//       toast.error("Failed to create product. Please try again.");
//     }
//   };

//   return (
//     <section className="flex justify-center items-center bg-teal-600 w-full h-[120vh] mx-auto">
//       <ToastContainer />
//       <div className="w-full max-w-md p-6 sm:p-8 bg-white border border-gray-200 rounded-2xl shadow-lg">
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
//           <h5 className="text-xl font-medium text-teal-600 text-center">
//             Create Product
//           </h5>

//           {/* Name */}
//           <div>
//             <label className="block mb-1 text-sm text-gray-700">Name</label>
//             <input {...register("name")} type="text" placeholder="Product name"
//               className="input w-full p-2 border rounded-lg text-sm" />
//             {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
//           </div>

//           {/* Quantity */}
//           <div>
//             <label className="block mb-1 text-sm text-gray-700">Quantity</label>
//             <input {...register("stockQuantity")} type="number" placeholder="Product Stock Quantity"
//               className="input w-full p-2 border rounded-lg text-sm" />
//             {errors.stockQuantity && <p className="text-red-500 text-sm">{errors.stockQuantity.message}</p>}
//           </div>

//           {/* Price In */}
//           <div>
//             <label className="block mb-1 text-sm text-gray-700">PriceIn</label>
//             <input {...register("priceIn")} type="number" placeholder="Product priceIn"
//               className="input w-full p-2 border rounded-lg text-sm" />
//             {errors.priceIn && <p className="text-red-500 text-sm">{errors.priceIn.message}</p>}
//           </div>

//           {/* Price Out */}
//           <div>
//             <label className="block mb-1 text-sm text-gray-700">PriceOut</label>
//             <input {...register("priceOut")} type="number" placeholder="Product priceOut"
//               className="input w-full p-2 border rounded-lg text-sm" />
//             {errors.priceOut && <p className="text-red-500 text-sm">{errors.priceOut.message}</p>}
//           </div>

//           {/* Thumbnail */}
//           <div>
//             <label className="block mb-1 text-sm text-gray-700">Thumbnail</label>
//             <textarea {...register("thumbnail")} placeholder="Product thumbnail"
//               className="input w-full p-2 border rounded-lg text-sm" />
//             {errors.thumbnail && <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>}
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block mb-1 text-sm text-gray-700">Description</label>
//             <textarea {...register("description")} placeholder="Product description"
//               className="input w-full p-2 border rounded-lg text-sm" />
//             {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
//           </div>

//           <button type="submit"
//             className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg text-sm transition">
//             Create Product
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// }

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useUploadFileMutation } from "../../features/file/fileSlice";
// import { useNavigate } from "react-router";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useCreateProductMutation } from "../../features/product/productSlice";

// const productSchema = z.object({
//   name: z.string().nonempty("Name is required"),
//   stockQuantity: z
//     .string()
//     .nonempty("Stock Quantity is required")
//     .transform(Number),

//   priceIn: z.string().nonempty("Stock Quantity is required").transform(Number),
//   priceOut: z.string().nonempty("Stock Quantity is required").transform(Number),
//   description: z.string().nonempty("Description is required"),
//   thumbnail: z.string().nonempty("Thumbnail is required"),
// });

// export default function CreateProduct() {
//   const [uploadFile] = useUploadFileMutation();
//   const [createProduct] = useCreateProductMutation();
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       name: "",
//       description: "",
//       stockQuantity: "",
//       priceIn: "",
//       priceOut: "",
//       thumbnail: "",
//     },
//     resolver: zodResolver(productSchema),
//   });

//   const onSubmit = async (data) => {
//     try {
//       const productData = {
//         ...data,
//         computerSpec: {
//           processor: "N/A",
//           ram: "N/A",
//           storage: "N/A",
//           gpu: "N/A",
//           os: "N/A",
//           screenSize: "N/A",
//           battery: "N/A",
//         },
//         discount: 15,
//         color: [{ color: "", images: [data.thumbnail] }],
//         availability: true,
//         images: [data.thumbnail],
//         categoryUuid: "dc071830-ce8a-40e2-ad51-3c1adeeb02cb",
//         supplierUuid: "0980127a-dc6d-487d-b166-957bcda2540d",
//         brandUuid: "8265f3c7-9aea-498c-88b2-9e1bacb4f716",
//       };

//       await createProduct(productData).unwrap();
//       toast.success("Product created successfully!");
//       setTimeout(() => navigate("/products"), 900);
//     } catch (err) {
//       console.error("Product creation error:", err);
//       toast.error("Failed to create product. Please try again.");
//     }
//   };

//   return (
//     <section className="flex justify-center items-center">
//       <ToastContainer />

//       <div className="w-full max-w-md p-6 sm:p-8 bg-white border border-gray-200 rounded-2xl shadow-lg">
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="space-y-6"
//           noValidate
//         >
//           <h5 className="text-xl font-medium text-teal-600 text-center">
//             Create Product
//           </h5>

//           <div>
//             <label className="block mb-1 text-sm text-gray-700">Name</label>
//             <input
//               {...register("name")}
//               type="text"
//               placeholder="Product name"
//               className="input w-full p-2 border rounded-lg text-sm"
//             />
//             {errors.name && (
//               <p className="text-red-500 text-sm">{errors.name.message}</p>
//             )}
//           </div>

//           <div>
//             <label className="block mb-1 text-sm text-gray-700">Quantity</label>
//             <input
//               {...register("stockQuantity")}
//               type="number"
//               placeholder="Product Stock Quantity"
//               className="input w-full p-2 border rounded-lg text-sm"
//             />
//             {errors.stockQuantity && (
//               <p className="text-red-500 text-sm">
//                 {errors.stockQuantity.message}
//               </p>
//             )}
//           </div>

//           <div>
//             <label className="block mb-1 text-sm text-gray-700">PriceIn</label>
//             <input
//               {...register("priceIn")}
//               type="number"
//               placeholder="Product priceIn"
//               className="input w-full p-2 border rounded-lg text-sm"
//             />
//             {errors.priceIn && (
//               <p className="text-red-500 text-sm">{errors.priceIn.message}</p>
//             )}
//           </div>

//           <div>
//             <label className="block mb-1 text-sm text-gray-700">PriceOut</label>
//             <input
//               {...register("priceOut")}
//               type="number"
//               placeholder="Product priceOut"
//               className="input w-full p-2 border rounded-lg text-sm"
//             />
//             {errors.priceOut && (
//               <p className="text-red-500 text-sm">{errors.priceOut.message}</p>
//             )}
//           </div>

//           <div>
//             <label className="block mb-1 text-sm text-gray-700">
//               thumbnail
//             </label>
//             <textarea
//               {...register("thumbnail")}
//               placeholder="Product thumbnail"
//               className="input w-full p-2 border rounded-lg text-sm"
//             />
//             {errors.thumbnail && (
//               <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>
//             )}
//           </div>

//           <div>
//             <label className="block mb-1 text-sm text-gray-700">
//               Description
//             </label>
//             <textarea
//               {...register("description")}
//               placeholder="Product description"
//               className="input w-full p-2 border rounded-lg text-sm"
//             />
//             {errors.description && (
//               <p className="text-red-500 text-sm">
//                 {errors.description.message}
//               </p>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg text-sm transition"
//           >
//             Create Product
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// }
