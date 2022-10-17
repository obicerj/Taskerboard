import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import { store } from "./store";
import { Provider } from 'react-redux'
import "./index.css";
import ErrorPage from "./ErrorPage";
import MainBoard from "./components/MainBoard";
import Home from "./routes/Home";
import Dashboard from "./routes/Dashboard";


const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    // Pass Outlet to App element
    children: [
      {
        path: "/",
        element: <Dashboard />
      },
      {
        path: "/board/:mainboardId",
        element: <MainBoard />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
    {/* <App /> */}
    <RouterProvider router={router} />
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} position="bottom-right"/>
  </QueryClientProvider>
);
