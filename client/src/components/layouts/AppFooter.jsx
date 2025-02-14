import React from "react";
import { FaPhoneAlt, FaEnvelope, FaLinkedin, FaYoutube, FaFacebookF, FaInstagram, FaTwitter, FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmazonPay } from "react-icons/fa";

const AppFooter = () => {
    return (
        <footer className="bg-bg-footer text-white py-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Company Information */}
                    <div>
                        <h2 className="text-lg font-semibold">E-Commerce</h2>
                        <p className="mt-2 text-sm">
                            Bringing you the best of E-Commerce, delivered fast and hassle-free.
                        </p>
                        <div className="mt-4 space-y-3">
                            <div className="flex items-center space-x-2">
                                <FaPhoneAlt className="text-lg" />
                                <span>8801321774599</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaEnvelope className="text-lg" />
                                <span>engr.rehad@gmail.com</span>
                            </div>
                        </div>
                        <div className="flex mt-4 space-x-4">
                            <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin className="text-2xl hover:text-blue transition duration-300 ease-in-out" />
                            </a>
                            <a href="https://youtube.com" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                                <FaYoutube className="text-2xl hover:text-red-600 transition duration-300 ease-in-out" />
                            </a>
                            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                                <FaFacebookF className="text-2xl hover:text-blue transition duration-300 ease-in-out" />
                            </a>
                            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                                <FaInstagram className="text-2xl hover:text-pink-500 transition duration-300 ease-in-out" />
                            </a>
                            <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                                <FaTwitter className="text-2xl hover:text-blue transition duration-300 ease-in-out" />
                            </a>
                        </div>
                    </div>

                    {/* Payment Methods Section */}
                    <div>
                        <h2 className="text-lg font-semibold">Payment Methods</h2>
                        <p className="mt-2 text-sm">
                            We accept all major payment methods.
                        </p>
                        <div className="flex mt-4 space-x-4">
                            <FaCcVisa className="text-4xl hover:text-blue transition duration-300 ease-in-out" />
                            <FaCcMastercard className="text-4xl hover:text-red-500 transition duration-300 ease-in-out" />
                            <FaCcPaypal className="text-4xl hover:text-blue transition duration-300 ease-in-out" />
                            <FaCcAmazonPay className="text-4xl hover:text-yellow-600 transition duration-300 ease-in-out" />
                        </div>
                    </div>

                    {/* Company */}
                    <div>
                        <h2 className="text-lg font-semibold">Company</h2>
                        <ul className="mt-2 space-y-2 text-sm">
                            <li><a href="/about" className="hover:text-gray-400 transition duration-300 ease-in-out">About Us</a></li>
                            <li><a href="/contact" className="hover:text-gray-400 transition duration-300 ease-in-out">Contact</a></li>
                            <li><a href="/terms-conditions" className="hover:text-gray-400 transition duration-300 ease-in-out">Terms & Conditions</a></li>
                            <li><a href="/privacy-policy" className="hover:text-gray-400 transition duration-300 ease-in-out">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Subscription Section */}
                    <div>
                        <h2 className="text-lg font-semibold">Subscribe to our Newsletter</h2>
                        <p className="mt-2 text-sm">
                            Stay updated with our latest offers and news.
                        </p>
                        <div className="mt-4">
                            <div className="flex flex-col space-y-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-bg-white text-black"
                                />
                                <button
                                    type="submit"
                                    className="w-full py-2 bg-bg-primary hover:bg-bg-secondary rounded-md transition duration-300 ease-in-out text-white font-semibold"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm">
                    <p>© 2024 All rights reserved by Rehad Hasan.</p>
                </div>
            </div>
        </footer>
    );
};

export default AppFooter;
