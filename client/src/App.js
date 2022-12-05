import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import { Fragment } from "react";
import Write from "./pages/Write";
import Single from "./pages/Single";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import "./style.scss";

const Layout = () => {
  return (
    <Fragment>
      <Navbar />
      <Outlet />
      <Footer />
    </Fragment>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/write",
        element: <Write />,
      },
      {
        path: "/write/:id",
        element: <Write />,
      },
      {
        path: "/post/:id",
        element: <Single />,
      },
    ],
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
