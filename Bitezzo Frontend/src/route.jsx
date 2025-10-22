import ProductDetailView from "./components/Products/ProductDetailView";
import Cartpage from "./pages/CartPage/CartPage";
import HomePage from "./pages/Homepage/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import OrderPage from "./pages/OrderPage/OrderPage";
import ProductPage from "./pages/Products/ProductPage";
import SignupPage from "./pages/Signup/SignupPage";
import WishlistPage from "./pages/WishListPage/WishlistPage";




const routes = [
    // { path: "/", element: <Navigate to="/defaultId" replace /> },
    { path: "/", element: <HomePage /> },  
    { path: "/signup", element: <SignupPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/products", element: <ProductPage /> },
    { path: "/productview/:id", element: <ProductDetailView /> },
    { path: "/cart", element: <Cartpage/> },
    { path: "/wishlist", element: <WishlistPage/> },
    { path: "/order", element: <OrderPage/> }

]


export default routes