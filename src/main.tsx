import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import Groups from "./Components/Groups.tsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Accounts from "./Components/Accounts.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/groups",
    element: <Groups></Groups>,
  },
  {
    path: "/account",
    element: <Accounts></Accounts>,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
