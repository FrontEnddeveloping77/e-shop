import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Home from "../pages/Home/Home";
import Cart from "../pages/Cart/Cart"; // Import qilish
import Wishlist from "../pages/Wishlist/Wishlist"; // Import qilish
import ProductDetail from "../pages/ProductDetail/ProductDetail";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/cart", element: <Cart /> },      // Savatcha yo'li
            { path: "/wishlist", element: <Wishlist /> }, // Wishlist yo'li
            { path: "/product/:id", element: <ProductDetail /> }
        ]
    }
]);