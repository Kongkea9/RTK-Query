import React from "react";
import NavbarBasic from "./navbar";
import { Outlet } from "react-router";
import Footer from "./footer";

export default function RootLayout() {
  return (
    <>
      <NavbarBasic />
      <Outlet />
      <Footer />
    </>
  );
}
