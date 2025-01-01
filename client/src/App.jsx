import React from "react";
import { useRoutes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Owner from "./components/Owner";
import User from "./components/User";
function App() {
  const routes = useRoutes([
    { path: "/", element: <Login /> },
    {path : "/owner", element : <Owner />},
    {path :"/register",element : <Register />},
    {path : "/user", element : <User />}
  ]);

  return routes
}

export default App
