// import React from "react";
// import CardProduct from "../../components/card/card-product";

// import { Link } from "react-router";
// import SkeletonCardProduct from "../../components/card/skeleton-card-product";
// // export default function Product() {
// //   const { data, isLoading, isError } = useGetProductsQuery();
// //   const skeletonCount = 8;

// //   return (
// //     <main className="max-w-screen-xl mx-auto">
// //       <Link
// //         className="flex h-[40px] w-[150px] mb-3 px-5 items-center gap-2 text-white rounded-md py-4 bg-emerald-500 transition-colors duration-300 hover:bg-emerald-600 focus:text-emerald-600 focus:outline-none focus-visible:outline-none"
// //         to="/createProduct"
// //       >
// //         <span>Create Product</span>
// //       </Link>

// //         <section className="grid grid-cols-4 gap-5">
// //           {isLoading &&
// //             Array.from({ length: skeletonCount }).map((_, index) => (
// //               <SkeletonCardProduct key={index} />
// //             ))}

// //           {!isLoading &&
// //             data?.map((p) => (
// //               <CardProduct
// //                 key={p.id}
// //                 thumbnail={
// //                   p.images && p.images.length > 0
// //                     ? p.images[0]
// //                     : "fallback-image-url-or-placeholder.jpg"
// //                 }
// //                 title={p.title}
// //                 id={p.id}
// //               />
// //             ))}
// //         </section>
// //     </main>
// //   );
// // }

// export default function Product()  {
//   const { data, isLoading } = useGetProductsQuery();
//  const array = [1, 2, 3, 4, 5, 6, 7, 8];

//   console.log("data from RTK Query", data);

//   return (
//     <>
//        <main className="max-w-screen-xl mx-auto">
//         <section className="grid grid-cols-4 gap-5">
//           {isLoading &&
//             array.map((index) => <SkeletonCardProduct key={index} />)}
//           {/* product section */}
//           {!isLoading &&
//             data?.content.map((p, index) => (
//               <CardProduct
//                 key={index}
//                 thumbnail={p.thumbnail}
//                 title={p.name}
//                 id={p.uuid}
//               />
//             ))}
//         </section>
//       </main>
//     </>
//   );
// }

import { useGetProductsQuery } from "../../features/product/productSlice";
import { Link } from "react-router";
import DataTable from "react-data-table-component";

export default function Product() {
  const { data, isLoading } = useGetProductsQuery();
  const columns = [
    {
      name:"No",
      cell:(row, index) => index +1,
      width: "60px",

    },
    {
      name: "Thumbnail",
      selector: (row) =>
        row?.thumbnail ? (
          <img
            src={row.thumbnail}
            alt={row.name}
            className="w-12 h-12 object-cover rounded"
          />
        ) : (
          "No Image"
        ),
    },
    {
      name: "Name",
      selector: (row) => row?.name,
    },
    {
      name: "Category",
      selector: (row) => row?.category?.name,
    },
    {
      name: "Price",
      selector: (row) => row?.priceOut,
    },
    {
      name: "Stock",
      selector: (row) => row?.stockQuantity,
    },

    {
      name: "Actions",
      button: true,
      width: "180px",
      cell: (row) => (
        <div className="flex justify-center items-center gap-1">
          <Link
            to={`/products/${row.uuid}`}
            className="inline-flex justify-center items-center w-[40px] h-[35px] text-white rounded-md bg-yellow-500 transition-colors duration-300 hover:bg-yellow-600"
          >
            View
          </Link>

          <Link
            to={`/update/${row.uuid}`}
            className="inline-flex justify-center items-center w-[50px] h-[35px] text-white rounded-md bg-emerald-500 transition-colors duration-300 hover:bg-emerald-600"
          >
            Update
          </Link>

          <Link
            to={`/delete/${row.uuid}`}
            className="inline-flex justify-center items-center w-[60px] h-[35px] text-white rounded-md bg-red-500 transition-colors duration-300 hover:bg-red-600"
          >
            Delete
          </Link>
        </div>
      ),
    },
  ];

  console.log("data from RTK Query", data);

  return (
    <main className="max-w-screen-xl mx-auto">
      <Link
        className="flex h-[40px] w-[150px] mb-3 px-5 items-center gap-2 text-white rounded-md py-4 bg-emerald-500 transition-colors duration-300 hover:bg-emerald-600 focus:text-emerald-600 focus:outline-none focus-visible:outline-none"
        to="/createProduct"
      >
        <span>Create Product</span>
      </Link>

      <DataTable
        columns={columns}
        data={data?.content}
        pagination
        progressPending={isLoading}
      />
    </main>
  );
}
