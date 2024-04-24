//basic react imports
import React from "react";
import { createBrowserRouter, RouterProvider, createHashRouter } from "react-router-dom";

//tanstack query imports
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/challengeApi";

//mui imports
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

//pages imports
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import EditRecord from "./pages/EditRecord";
import NewRecord from "./pages/NewRecord";

//page theme creation
const theme = createTheme({
  palette: {
    mode: "light",
    // primary: {
    //   main: "#569c4c",
    // },
    // secondary: {
    //   main: "#f50057",
    // },
    background: {
      default: "#e8e5e5",
      // paper: "#c8e6c9",
    },
  },
});

// const router = createBrowserRouter([
const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          { path: "new", element: <NewRecord /> },
          { path: ":id", element: <EditRecord /> },
        ],
      },
      // { path: "auth", element: <Login /> },
      // { path: "unauthorized", element: <Unauthorized /> },

      //authenticated routes
      // {
      //   element: <PersistLogin />,
      //   children: [
      //     {
      //       element: <RequireAuth allowedRoles={[250]} />,
      //       children: [
      //         { path: "/", element: <Home /> },
      //         { path: "test1", element: <Test1 /> },
      //       ],
      //     },
      //     {
      //       element: <RequireAuth allowedRoles={[250]} />,
      //       children: [
      //         { path: "test2", element: <Test2 />  },
      //         { path: "test3", element: <Test3 />  },

      //       ],
      //     },
      //   ],
      // },
    ],
  },
]);

function App({children}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RouterProvider router={router} />
          </LocalizationProvider>
        </CssBaseline>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
