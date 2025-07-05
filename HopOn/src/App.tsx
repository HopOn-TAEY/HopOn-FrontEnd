import { RouterProvider } from "react-router";
import { router } from "../src/router";

export function App() {
  return <RouterProvider router={router} />;
}
