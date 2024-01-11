import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./Home";
import ErrorPage from "./ErrorPage";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/:page",
      element: <Home />,
      errorElement: <ErrorPage />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
