import { useNavigate, useParams } from "react-router";
import { useDeleteProductMutation } from "../../features/product/productSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function DeleteProduct() {
  const { id } = useParams();
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteProduct(id).unwrap();
      toast.success("Product deleted successfully.");

      setTimeout(() => navigate("/products"), 900);
    } catch (error) {
      toast.error("Error : " + error);
    }
  };

  const handleCancel = () => {
    navigate("/products");
  };

  return (
    <section className="flex justify-center items-center bg-teal-600 w-full  h-[120vh] mx-auto">
      <div className="w-full max-w-md p-6 sm:p-8 bg-white border border-gray-200 rounded-2xl shadow-lg">
        <ToastContainer />
    
        <p className="text-2xl text-gray-800 py-10">
          Are you sure to delete product?
        </p>
        <div className="flex justify-center items-center gap-5">
          <button
            onClick={() => handleDelete()}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg text-sm transition"
          >
            Yes
          </button>

          <button
            onClick={() => handleCancel()}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg text-sm transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
}
