import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import DetailsPage from "./pages/DetailsPage.jsx";
import ProductListByKeywordPage from "./pages/ProductListByKeywordPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import OTPPage from "./pages/SendOTPPage.jsx";
import OTPVerifyPage from "./pages/OTPVerifyPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";
import ProductListByCategoryPage from "./pages/ProductListByCategoryPage.jsx";
import ProductListByBrandPage from "./pages/ProductListByBrandPage.jsx";
import NotFound from "./components/layouts/NotFound.jsx";
import CartPage from "./pages/CartPage.jsx";
import WishPage from "./pages/WishPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import OrdersDetailsPage from "./pages/OrdersDetailsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import BlogDetailsPage from "./pages/BlogDetailsPage.jsx";
import CareerPage from "./pages/CareerPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import TermsConditionsPage from "./pages/TermsConditionsPage.jsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import BrandPage from "./pages/BrandPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import PopularProductsPage from "./pages/PopularProductsPage.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/new-products" element={<ProductsPage/>} />
                <Route path="/popular-products" element={<PopularProductsPage/>} />
                <Route path="/details/:productID" element={<DetailsPage/>} />
                <Route path="/by-category/:categoryID" element={<ProductListByCategoryPage/>} />
                <Route path="/categories" element={<CategoryPage/>} />
                <Route path="/by-brand/:brandID" element={<ProductListByBrandPage/>} />
                <Route path="/brands" element={<BrandPage/>} />
                <Route path="/by-keyword/:keyword" element={<ProductListByKeywordPage/>} />
                <Route path="/signup" element={<SignupPage/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/otp" element={<OTPPage/>} />
                <Route path="/verify-otp" element={<OTPVerifyPage/>} />
                <Route path="/reset-password" element={<ResetPasswordPage/>} />
                <Route path="/cart" element={<CartPage/>} />
                <Route path="/wish" element={<WishPage/>} />
                <Route path="/dashboard" element={<DashboardPage/>} />
                <Route path="/orders" element={<OrdersPage/>} />
                <Route path="/orders/:invoiceID" element={<OrdersDetailsPage/>} />
                <Route path="/profile" element={<ProfilePage/>} />
                <Route path="/settings" element={<SettingsPage/>} />
                <Route path="/about" element={<AboutPage/>} />
                <Route path="/gallery" element={<GalleryPage/>} />
                <Route path="/blog" element={<BlogPage/>} />
                <Route path="/blog-details/:blogID" element={<BlogDetailsPage/>} />
                <Route path="/career" element={<CareerPage/>} />
                <Route path="/contact" element={<ContactPage/>} />
                <Route path="/terms-conditions" element={<TermsConditionsPage/>} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage/>} />
                <Route path={'*'} element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;