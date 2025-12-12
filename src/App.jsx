import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/voir",
    element: <Layout />,
    children: [],
  },
  {
    path: "/",
    element: <Home />,
  },
]);

function App() {
  return (
    <>
      <div className="h-full w-full">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
