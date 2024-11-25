import { render } from "preact";
import { App } from "./app";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SharedTaskView } from "./SharedTaskView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/shared/:task_id",
    element: <SharedTaskView />,
  },
]);

render(<RouterProvider router={router} />, document.getElementById("app")!);
