import React from "react";
import UserStore from "../../store/UserStore.js";
import InvoiceStore from "../../store/InvoiceStore.js";
import WishStore from "../../store/WishStore.js";

const Dashboard = () => {
    const {UserDetails} = UserStore()
    const {InvoiceList} = InvoiceStore()
    const {WishList} = WishStore()

    return (
        <div className="p-6 space-y-6">
            {/* User Information */}
            <section className="bg-white p-4 rounded shadow">
                <h2 className="text-black text-opacity-90 text-xl font-bold mb-4">User Information</h2>
                <p className='text-black text-opacity-90'><strong>Name:</strong> {UserDetails.name}</p>
                <p className='text-black text-opacity-90'><strong>Email:</strong> {UserDetails.email}</p>
                <p className='text-black text-opacity-90'><strong>Phone:</strong> {UserDetails.phone}</p>
            </section>

            {/* Recent Orders */}
            <section className="bg-white p-4 rounded shadow">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-black text-opacity-90 text-xl font-bold">Recent Orders</h2>
                </div>
                {InvoiceList.length > 0 ? (
                    <div className="space-y-4">
                        {InvoiceList.map((order) => (
                            <div
                                key={order.id}
                                className="flex justify-between items-center bg-gray-50 md:p-4 px-4 py-8 rounded shadow relative"
                            >
                                <div className="space-y-1 sm:w-3/4">
                                    <p className="text-sm font-medium text-black text-opacity-70">
                                        Order ID: <span className="text-black text-opacity-90 font-bold">{order.tran_id}</span>
                                    </p>
                                    <p className="text-sm font-medium text-black text-opacity-70">
                                        Payment: <span className="text-black text-opacity-90 font-bold">{order.payment_status}</span>
                                    </p>
                                    <p className="text-sm font-medium text-black text-opacity-70">
                                        Delivery: <span className="text-black text-opacity-90 font-bold">{order.delivery_status}</span>
                                    </p>
                                    <p className="text-sm text-black text-opacity-70">Date: {order.createdAt.slice(0,10)}</p>
                                </div>
                                <p className="text-lg font-bold text-black text-opacity-90">{Number(order.payable).toFixed(2)}</p>

                                {/* View Button */}
                                <button
                                    onClick={()=>window.location.href = `/orders/${order._id}`}
                                    className="absolute top-2 right-2 sm:relative sm:top-0 sm:right-0 px-3 py-1 text-sm sm:px-4 sm:py-2 sm:text-base bg-primary text-white rounded hover:bg-primary"
                                >
                                    View
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className='text-black text-opacity-90'>No recent orders.</p>
                )}
            </section>

            {/* Favorite Items */}
            <section className="bg-white p-4 rounded shadow">
                <h2 className="text-black text-opacity-90 text-xl font-bold mb-4">Favorite Items</h2>
                {WishList.length > 0 ? (
                    <div className="space-y-4">
                        {WishList.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-gray-50 p-4 rounded shadow"
                            >
                                {/* Product Image */}
                                <div className="w-24 h-24 bg-gray-200 rounded overflow-hidden flex items-center justify-center">
                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Product Details */}
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-black text-opacity-80">{item.product.name}</h3>
                                    <p className="text-sm text-black text-opacity-60">
                                        Price: <span
                                        className="font-bold">${Number(item.product.discount ? item.product.discountPrice : item.product.price).toFixed(2)}</span>
                                    </p>
                                    <p className="text-sm text-black text-opacity-60">
                                        Rating: <span
                                        className="font-bold">{Number(item.totalRating).toFixed(1)} ⭐</span>
                                    </p>
                                    <p className="text-sm text-black text-opacity-60">
                                        Color: <span className="font-bold">{item.product.color}</span>
                                    </p>
                                    <p className="text-sm text-black text-opacity-60">
                                        Size: <span className="font-bold">{item.product.size}</span>
                                    </p>
                                </div>

                                {/* View Button */}
                                <button
                                    onClick={() => (window.location.href = `/details/${item.product._id}`)}
                                    className="px-4 py-2 bg-primary text-white rounded hover:bg-primary"
                                >
                                    View
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className='text-black text-opacity-90'>No favorite items.</p>
                )}
            </section>
        </div>
    );
};

export default Dashboard;
