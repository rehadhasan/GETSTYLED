import React from "react";
import { motion } from "framer-motion";
import {
    FaArrowLeft,
    FaCcAmazonPay,
    FaCcMastercard,
    FaCcPaypal,
    FaCcVisa,
    FaShoppingCart
} from "react-icons/fa";
import CartStore from "../../store/CartStore.js";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";
import InvoiceStore from "../../store/InvoiceStore.js";
import UserStore from "../../store/UserStore.js";

const AppCartList = () => {
    const navigate = useNavigate();
    const { CartList, RemoveCartRequest, CartListRequest, TotalPrice, shippingCharge, PayableAmount } = CartStore();
    const {invoiceIsSubmit, CreateInvoiceRequest} = InvoiceStore()
    const {ProfileDetails} = UserStore()

    const handleRemove = async (cartID) => {
        let res = await RemoveCartRequest(cartID);
        if (res) {
            await CartListRequest();
            toast.success("Item Delete Success");
        } else {
            toast.error("Something Went Wrong");
        }
    };

    const handleCheckout = async () => {
        if(ProfileDetails === null){
            toast.error("Complete Your Profile, Continue..")
            window.location.href = "/profile"
        }else{
            await CreateInvoiceRequest()
        }
    }

    return (
        <section className="bg-white">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-black text-opacity-90 text-xl lg:text-2xl font-bold mb-4">Shopping Cart</h1>

                {CartList.length === 0 ? (
                    <div className="text-center py-8">
                        <motion.div
                            initial={{opacity: 0, scale: 0.9}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{duration: 0.5, ease: "easeInOut"}}
                        >
                            <div className="flex flex-col items-center">
                                <motion.div
                                    initial={{rotate: 0}}
                                    animate={{rotate: 360}}
                                    transition={{duration: 2, repeat: Infinity, ease: "linear"}}
                                    className="p-4 bg-primary bg-opacity-20 rounded-full"
                                >
                                    <FaShoppingCart className="text-secondary text-4xl"/>
                                </motion.div>
                                <p className="text-lg text-black text-opacity-60 mt-4">Your cart is currently empty.</p>
                                <motion.button
                                    whileHover={{scale: 1.1}}
                                    whileTap={{scale: 0.9}}
                                    className="mt-4 bg-secondary hover:bg-primary text-white px-5 py-2 rounded uppercase flex items-center gap-2"
                                    onClick={()=>navigate('/')}
                                >
                                    <FaArrowLeft className="text-white"/>
                                    Continue Shopping
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>

                ) : (
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Product List */}
                        <div className="flex-1 bg-white rounded-lg shadow-lg p-4">
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm md:text-base">
                                    <thead>
                                    <tr className="whitespace-nowrap text-center text-black text-opacity-60 uppercase">
                                        <th className="p-2 text-left">Product</th>
                                        <th className="p-2"></th>
                                        <th className="p-2">Quantity</th>
                                        <th className="p-2">Price</th>
                                        <th className="p-2">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {CartList.map((item, index) => (
                                        <motion.tr
                                            key={index}
                                            className="border-b"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <td className="p-2">
                                                <img
                                                    src={item["product"].image}
                                                    alt={item["product"].name}
                                                    className="w-16 h-16 rounded-lg object-cover"
                                                />
                                            </td>
                                            <td className="p-2">
                                                <div className="whitespace-nowrap">
                                                    <p className="font-medium text-black">{item["product"].name}</p>
                                                    <p className="text-sm text-black text-opacity-50">
                                                        Size: {item.size}, Color: {item.color},
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="p-2">
                                                <div className="flex items-center justify-center">
                                                    <span className="text-black">{item.qty}</span>
                                                </div>
                                            </td>
                                            {item["product"].discount ? (
                                                <td className="p-2">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <p className="text-black">
                                                            ${parseFloat(item["product"].discountPrice).toFixed(2)}
                                                        </p>
                                                    </div>

                                                </td>
                                            ) : (
                                                <td className="p-2">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <p className="text-black">
                                                            ${parseFloat(item["product"].price).toFixed(2)}
                                                        </p>
                                                    </div>
                                                </td>
                                            )}
                                            <td className="p-2">
                                                <div className="flex gap-2 items-center justify-center">
                                                    <button
                                                        onClick={() => handleRemove(item._id)}
                                                        className="px-3 py-2 border border-black border-opacity-10 rounded"
                                                    >
                                                            <span className="text-black text-opacity-50 text-sm font-semibold">
                                                                Remove
                                                            </span>
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex items-center justify-between mt-5">
                                <button className="text-black hover:underline">Continue Shopping</button>
                                {
                                    invoiceIsSubmit?(
                                        <button className="bg-secondary text-white px-5 py-2 rounded capitalize flex items-center gap-2">
                                            <span>Processing</span>
                                            <span className="loading loading-spinner loading-sm"></span>
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleCheckout}
                                            className="bg-secondary text-white px-5 py-2 rounded uppercase">
                                            Checkout
                                        </button>
                                    )
                                }
                            </div>
                        </div>

                        {/* Summary Section */}
                        <div
                            className="bg-white rounded-lg shadow-lg p-4 w-full lg:w-1/3 h-full text-center lg:text-left">
                            <div className="py-4">
                                <h2 className="text-black text-opacity-60 text-lg font-bold">Total Summary</h2>
                                <div className="text-black text-opacity-90 flex justify-between mt-3">
                                    <p>Total Price:</p>
                                    <p>${TotalPrice.toFixed(2)}</p>
                                </div>
                                <div className="text-black text-opacity-90 flex justify-between mt-1">
                                    <p>Shipping:</p>
                                    <p>${shippingCharge.toFixed(2)}</p>
                                </div>
                                <div className="text-black text-opacity-90 flex justify-between mt-1">
                                    <p>Payable:</p>
                                    <p>${PayableAmount.toFixed(2)}</p>
                                </div>
                            </div>
                            <hr/>
                            <div className="flex items-center justify-center mt-4 space-x-4">
                                <FaCcVisa className="text-4xl text-blue transition duration-300 ease-in-out"/>
                                <FaCcMastercard className="text-4xl text-red-500 transition duration-300 ease-in-out"/>
                                <FaCcPaypal className="text-4xl text-blue transition duration-300 ease-in-out"/>
                                <FaCcAmazonPay className="text-4xl text-yellow-600 transition duration-300 ease-in-out"/>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AppCartList;
