import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Cartpage from "./user/pages/CartPage";
import HomePage from "./user/pages/HomePage";
import LoginPage from "./user/pages/LoginPage";
import CheckoutPage from "./user/pages/CheckoutPage";
import ProductPage from "./user/pages/ProductPage";
import SignupPage from "./user/pages/SignupPage";
import WishlistPage from "./user/pages/WishlistPage";
import PaymentPage from "./user/pages/PaymentPage";
import SearchPage from "./user/pages/SearchPage";
import OrderPage from "./user/pages/OrderPage";
import ProfilePage from "./user/pages/ProfilePage";
import ProductDetailView from "./user/pages/ProductDetailviewPage";
import About from "./user/pages/About";
import ScrollToTop from "./user/components/ScrollToTop";

import UsersTable from "./admin/Pages/ManageUsers";
import ProductTable from "./admin/Pages/ManageProduct";
import EditProduct from "./admin/Pages/EditProduct";
import AddProduct from "./admin/Pages/AddProduct";
import UsersDetailView from "./admin/Pages/UsersDetailView";
import AdminViewOrder from "./admin/Pages/AdminViewOrder";
import AdminOrderDetailView from "./admin/Pages/AdminOrderDetailView";
import AdminDashboard from "./admin/Pages/DashBoard";

// Layouts and Routes
import AdminInterface from "./admin/Layout/AdminInterFace";
import UserLayout from "./user/components/Layout/UserLayout";
import { ProtectedRoute } from "./user/components/Routes/ProtectedRoutes";
import { PublicRoute } from "./user/components/Routes/PublicRoutes";
import { AdminProtectedRoute } from "./admin/component/AdminProtectedRoutes";

// Context Providers
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { OrderProvider } from "./context/OrderContext";
import { Toaster } from "react-hot-toast";
import { SearchProvider } from "./context/SearchContext";
import { ProductProvider } from "./context/ProductContext";


function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <ScrollToTop />
      <AuthProvider>
        <ProductProvider>
          <SearchProvider>
            <CartProvider>
              <WishlistProvider>
                <OrderProvider>
                  <Routes>
                    {/* Public routes (no login required) with UserLayout */}
                    <Route element={<UserLayout />}>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/products" element={<ProductPage />} />
                      <Route path="/productview/:id" element={<ProductDetailView />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/search" element={<SearchPage />} />
                    </Route>

                    {/* Authentication-related routes (for unauthenticated users) */}
                    <Route element={<PublicRoute />}>
                      <Route path="/signup" element={<SignupPage />} />
                      <Route path="/login" element={<LoginPage />} />
                    </Route>

                    {/* Protected user routes (for logged-in users) with UserLayout */}
                    <Route element={<ProtectedRoute />}>
                      <Route element={<UserLayout />}>
                        <Route path="/cart" element={<Cartpage />} />
                        <Route path="/wishlist" element={<WishlistPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/payment" element={<PaymentPage />} />
                        <Route path="/order" element={<OrderPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                      </Route>
                    </Route>

                  
                    <Route element={<AdminProtectedRoute />}>
                      <Route path="/admin" element={<AdminInterface />}>
                        <Route index element={<AdminDashboard />} /> {/* This will match "/admin" */}
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="users" element={<UsersTable />} />
                        <Route path="users-detailview/:id" element={<UsersDetailView />} />
                        <Route path="products" element={<ProductTable />} />
                        <Route path="edit-product/:id" element={<EditProduct />} />
                        <Route path="add-product" element={<AddProduct />} />
                        <Route path="orders" element={<AdminViewOrder />} />
                        <Route path="order-detailview/:id" element={<AdminOrderDetailView />} />
                      </Route>
                    </Route>
                  </Routes>
                </OrderProvider>
              </WishlistProvider>
            </CartProvider>
          </SearchProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;