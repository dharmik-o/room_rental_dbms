import React from "react";
import { useRoutes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register"

function App() {
  const routes = useRoutes([
    { path: "/", element: <Register /> },
  ]);

  return routes
}

export default App
