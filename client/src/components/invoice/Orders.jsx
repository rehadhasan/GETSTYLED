import React from 'react';
import InvoiceStore from "../../store/InvoiceStore.js";

const Orders = () => {
    const {InvoiceList} = InvoiceStore()

    return (
        <div className="p-6 space-y-6">
            {/* Recent Orders */}
            <section className="bg-white p-4 rounded shadow">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Orders</h2>
                </div>
                {InvoiceList.length > 0 ? (
                    <div className="space-y-4">
                        {InvoiceList.map((order) => (
                            <div
                                key={order.id}
                                className="flex justify-between items-center bg-gray-50 md:p-4 px-4 py-8 rounded shadow relative"
                            >
                                <div className="space-y-1 sm:w-3/4">
                                    <p className="text-sm font-medium text-gray-600">
                                        Order ID: <span className="font-bold">{order.tran_id}</span>
                                    </p>
                                    <p className="text-sm font-medium text-gray-600">
                                        Payment: <span className="font-bold">{order.payment_status}</span>
                                    </p>
                                    <p className="text-sm font-medium text-gray-600">
                                        Delivery: <span className="font-bold">{order.delivery_status}</span>
                                    </p>
                                    <p className="text-sm text-gray-500">Date: {order.createdAt.slice(0,10)}</p>
                                </div>
                                <p className="text-lg font-bold text-gray-800">{Number(order.payable).toFixed(2)}</p>

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
                    <p>No orders yet.</p>
                )}
            </section>
        </div>
    );
};

export default Orders;
