import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./store.js";
import { Provider } from "react-redux";

import { BrowserRouter, Route, Routes } from "react-router";
import RootLayout from "./components/layouts/root-layout.jsx";
import Product from "./pages/product/Product.jsx";
import CreateProduct from "./pages/product/CreateProduct.jsx";
import ProductDetail from "./pages/product/ProductDetail.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import VerifyEmailForm from "./components/verify/VerifyEmailForm.jsx";
import UpdateProduct from "./pages/product/UpdateProduct.jsx";
import DeleteProduct from "./pages/product/DeleteProduct.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<App />} />
            <Route path="/products" element={<Product />} />
            <Route path="/products/:id" element={<ProductDetail />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/createProduct" element={<CreateProduct />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route path="/delete/:id" element={<DeleteProduct />} />
          <Route path="/verify-email" element={<VerifyEmailForm />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
