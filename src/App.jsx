import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { AdminProtectedRoute, GuestRoute } from './components/ProtectedRoute';
import Navbar         from './components/Navbar';
import Footer         from './components/Footer';
import Home           from './pages/Home';
import Medicines      from './pages/Medicines';
import Vaccines       from './pages/Vaccines';
import ProductDetail from './pages/ProductDetail';
import Cart           from './pages/Cart';
import Checkout       from './pages/Checkout';
import Invoice        from './pages/Invoice';
import Login          from './pages/Login';
import Register       from './pages/Register';
import Warehouse      from './pages/Warehouse';
import AdminLogin     from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminProducts  from './admin/AdminProducts';
import AdminOrders    from './admin/AdminOrders';
import AdminInventory from './admin/AdminInventory';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>
            } />
            <Route path="/admin/products" element={
              <AdminProtectedRoute><AdminProducts /></AdminProtectedRoute>
            } />
            <Route path="/admin/orders" element={
              <AdminProtectedRoute><AdminOrders /></AdminProtectedRoute>
            } />
            <Route path="/admin/inventory" element={
              <AdminProtectedRoute><AdminInventory /></AdminProtectedRoute>
            } />

            {/* Public Routes with Navbar & Footer */}
            <Route path="/*" element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/"              element={<Home />} />
                  <Route path="/medicines"      element={<Medicines />} />
                  <Route path="/vaccines"       element={<Vaccines />} />
                  <Route path="/product/:id"    element={<ProductDetail />} />
                  <Route path="/warehouse"      element={<Warehouse />} />
                  <Route path="/invoice/:id"    element={<Invoice />} />
                  
                  {/* Auth Routes */}
                  <Route path="/login" element={
                    <GuestRoute><Login /></GuestRoute>
                  } />
                  <Route path="/register" element={
                    <GuestRoute><Register /></GuestRoute>
                  } />

                  {/* Public Access (No Login Required) */}
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                </Routes>
                <Footer />
              </>
            } />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}