import "@ant-design/v5-patch-for-react-19";
import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { QueryProvider } from "@/services/context";
import App from "./App.tsx";
import Landing from "./pages/Landing/Landing.tsx";
import SignUp from "./pages/SignUp/SignUp.tsx";
import "./assets/styles/global.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  </StrictMode>
);
