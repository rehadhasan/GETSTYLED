// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import { BsPrinter } from 'react-icons/bs';
import InvoiceStore from "../../store/InvoiceStore.js";
import ReviewStore from "../../store/ReviewStore.js";
import {toast} from "react-toastify";

const OrderDetails = () => {
    const {InvoiceDetails} = InvoiceStore()
    const {SaveReviewRequest} = ReviewStore()

    const [showModal, setShowModal] = useState(false);
    const [review, setReview] = useState({
        productID: "",
        comment: "",
        rating: "",
    });

    const handleOpenModal = (productID) => {
        setReview({ ...review, productID });
        setShowModal(true);
    };

    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setReview({ ...review, [name]: value });
    };

    const handleRatingSelect = (star) => {
        setReview({ ...review, rating: star });
    };

    const handleReviewSubmit = async () => {
        let res = await SaveReviewRequest(review)
        if(res){
            toast.success("Thanks for review.")

            // Reset the review data
            setReview({
                productID: "",
                comment: "",
                rating: "",
            });
            setShowModal(false);
        }else{
            toast.error("Something went wrong !")

            // Reset the review data
            setReview({
                productID: "",
                comment: "",
                rating: "",
            });
            setShowModal(false);
        }
    };

    return (
        <div className="p-4 lg:p-8">
            {/* Order Info */}
            <div className="mt-6 bg-white shadow rounded-lg p-4 lg:p-6">
                <div className="flex justify-between items-center">
                    <h2 className="md:text-xl text-lg font-semibold">Order #{InvoiceDetails.invoice.tran_id}</h2>
                    <button onClick={()=>window.print()} className="btn btn-outline md:btn-md btn-sm flex items-center">
                        <BsPrinter className="mr-2"/> Print
                    </button>
                </div>
                <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm">
                    <div>
                        <p>
                            <strong>Paid on:</strong> {InvoiceDetails.invoice.createdAt.slice(0,10)}
                        </p>
                        <p>
                            <strong>Placed on:</strong> {InvoiceDetails.invoice.createdAt.slice(0,10)}
                        </p>
                        <p>
                            <strong>Updated:</strong> {InvoiceDetails.invoice.updatedAt.slice(0,10)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Details Section */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Customer Info */}
                <div className="bg-white shadow rounded-lg p-4">
                    <h3 className="font-medium mb-4">Customer & Order</h3>
                    <p><strong>Name:</strong> {InvoiceDetails.user.name}</p>
                    <p><strong>Email:</strong> {InvoiceDetails.user.email}</p>
                    <p><strong>Phone:</strong> {InvoiceDetails.user.phone}</p>
                    <p><strong>Payment Status:</strong> {InvoiceDetails.invoice.payment_status}</p>
                    <p><strong>Delivery Status:</strong> {InvoiceDetails.invoice.delivery_status}</p>
                </div>

                {/* Shipping Address */}
                <div className="bg-white shadow rounded-lg p-4">
                    <h3 className="font-medium mb-4">Shipping Address</h3>
                    {
                        InvoiceDetails.invoice.ship_details.split(', ').map((item)=> {
                            return <p key={item}>{item}</p>
                        })
                    }
                </div>

                {/* Billing Address */}
                <div className="bg-white shadow rounded-lg p-4">
                    <h3 className="font-medium mb-4">Billing Address</h3>
                    {
                        InvoiceDetails.invoice.cus_details.split(', ').map((item)=> {
                            return <p key={item}>{item}</p>
                        })
                    }
                </div>
            </div>

            {/* Items Ordered */}
            <div className="mt-6 bg-white shadow rounded-lg p-4">
                <h3 className="font-medium mb-4">Items Ordered</h3>
                <div className='overflow-x-auto whitespace-nowrap'>
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left p-2">Image</th>
                            <th className="text-left p-2">Item Name</th>
                            <th className="text-left p-2">Size</th>
                            <th className="text-left p-2">Color</th>
                            <th className="text-center p-2">Quantity</th>
                            <th className="text-right p-2">Price</th>
                            <th className="text-right p-2">Total</th>
                            <th className="text-center p-2">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            InvoiceDetails.products.map((item,index)=>{
                                return (
                                    <tr key={index}>
                                        <td className="p-2">
                                            <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                                className="w-12 h-12 rounded object-cover"
                                            />
                                        </td>
                                        <td className="p-2">{item.product.name}</td>
                                        <td className="p-2">{item.size}</td>
                                        <td className="p-2">{item.color}</td>
                                        <td className="p-2 text-center">{item.qty}</td>
                                        <td className="p-2 text-right">${Number(item.product.discount ? item.product.discountPrice : item.product.price).toFixed(2)}</td>
                                        <td className="p-2 text-right">${Number(item.product.discount ? item.product.discountPrice * item.qty : item.product.price * item.qty).toFixed(2)}</td>
                                        <td className="p-2 text-center">
                                            <button
                                                className="btn btn-sm bg-primary hover:bg-secondary text-white"
                                                onClick={() => handleOpenModal(item.productID)}
                                            >
                                                Create Review
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>

            <section className='mt-6 bg-white shadow rounded-lg p-4'>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Summery
                </h2>
                <div className="space-y-2">
                    <div className="flex justify-between items-center text-base">
                        <span className="text-gray-600">Total</span>
                        <span className="font-medium text-gray-900">${Number(InvoiceDetails.invoice.total).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-base">
                        <span className="text-gray-600">VAT</span>
                        <span className="font-medium text-gray-900">${Number(InvoiceDetails.invoice.vat).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-base">
                        <span className="text-gray-600">Delivery Charge</span>
                        <span className="font-medium text-gray-900">${Number(InvoiceDetails.invoice.shipping).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center border-t pt-2 mt-2">
                        <span className="text-lg font-semibold text-gray-700">Payable</span>
                        <span className="text-lg font-semibold text-green-600">${Number(InvoiceDetails.invoice.payable).toFixed(2)}</span>
                    </div>
                </div>
            </section>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-96">
                        <h2 className="text-lg font-medium mb-4">Create Review</h2>
                        {/* Star Rating System */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Rating</label>
                            <div className="flex space-x-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => handleRatingSelect(star)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill={star <= review.rating ? "currentColor" : "none"}
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className={`w-8 h-8 ${
                                                star <= review.rating
                                                    ? "text-yellow-300"
                                                    : "text-gray-300"
                                            }`}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 17.75l5.794 3.82-1.532-6.43 5.02-4.26-6.507-.58L12 2.5l-2.775 7.8-6.507.58 5.02 4.26-1.532 6.43L12 17.75z"
                                            />
                                        </svg>
                                    </button>
                                ))}
                            </div>
                            {!review.rating && (
                                <p className="text-red-500 text-sm mt-1">
                                    Please select a rating.
                                </p>
                            )}
                        </div>
                        {/* Comment Section */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Comment</label>
                            <textarea
                                name="comment"
                                value={review.comment}
                                onChange={handleReviewChange}
                                className="w-full border rounded p-2"
                                rows="3"
                            />
                            {!review.comment && (
                                <p className="text-red-500 text-sm mt-1">
                                    Please enter a comment.
                                </p>
                            )}
                        </div>
                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-2">
                            <button
                                className="btn btn-sm btn-outline"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-sm bg-primary hover:bg-secondary text-white"
                                onClick={() => {
                                    if (review.rating && review.comment) {
                                        handleReviewSubmit();
                                    } else {
                                        if (!review.rating) {
                                            alert("Rating is required.");
                                        }
                                        if (!review.comment) {
                                            alert("Comment is required.");
                                        }
                                    }
                                }}
                                disabled={!review.rating || !review.comment}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderDetails;
