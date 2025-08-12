import { useState } from "react";
import { useParams } from "react-router";
import { useGetProductByIdQuery } from "../../features/product/productSlice";

export default function ProductDetail() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetProductByIdQuery(id);

  const [mainImage, setMainImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  if (isLoading) return <p className="text-center mt-10 text-lg">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load product.</p>
    );
  if (!data)
    return <p className="text-center mt-10 text-red-500">Product not found.</p>;

  const allImages = [
    data.thumbnail,
    ...(data.images || []),
    ...(data.color?.flatMap((c) => c.images) || []),
  ].filter(Boolean);

  const handleThumbClick = (url) => {
    setMainImage(url);
  };

  return (
    <section className="p-6 md:p-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex md:flex-col gap-4 overflow-auto md:overflow-visible max-h-[400px]">
          {allImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`thumb-${index}`}
              className="w-20 h-20 rounded-lg object-cover border cursor-pointer hover:ring-2 ring-teal-500"
              onClick={() => handleThumbClick(img)}
            />
          ))}
        </div>

        <div className="flex-1">
          <img
            src={mainImage || allImages[0]}
            alt={data.name}
            className="w-full h-[400px] object-cover rounded-xl border"
          />
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-gray-500 text-start">
          <span className="font-medium">{data.category?.name}</span>
        </p>

        <h2 className="text-3xl font-bold">{data.name}</h2>

        <p className="text-gray-600 text-start">{data.description}</p>
        <p className="text-2xl text-green-600 font-semibold text-start">
          ${data.priceOut}
        </p>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">Select quantity</span>
          <div className="flex items-center gap-2 border rounded-lg px-2">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="text-lg px-2"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="text-lg px-2"
            >
              +
            </button>
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-700 block mb-1 text-start">
            Dimensions
          </label>
          <select className="w-full border rounded-lg px-3 py-2 text-sm">
            <option>Select a dimension</option>
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </select>
        </div>

        <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 rounded-lg transition">
          Add to Cart
        </button>
      </div>
    </section>
  );
}
