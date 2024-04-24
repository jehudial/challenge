//basic react imports
import React from "react";
import { Outlet } from "react-router-dom";

//custom components imports
import NavBar from "../components/NavBar";

const RootLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default RootLayout;
