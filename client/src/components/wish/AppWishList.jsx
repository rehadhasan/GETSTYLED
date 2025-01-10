import React, { useState } from "react";
import { motion } from "framer-motion";
import WishStore from "../../store/WishStore.js";
import { toast } from "react-toastify";
import { AiOutlineHeart } from "react-icons/ai";
import CartStore from "../../store/CartStore.js";

const WishList = () => {
    const { WishCount,  WishListRequest, WishList, RemoveWishRequest } = WishStore();
    const {SaveCartRequest, CartListRequest} = CartStore()

    // Modal State
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);

    const handleRemove = async (productID) => {
        let res = await RemoveWishRequest(productID);
        if (res) {
            await WishListRequest();
            toast.success("Item Removed Successfully");
        } else {
            toast.error("Something Went Wrong");
        }
    };

    const handleAddToCart = (item) => {
        setSelectedItem(item);
        setModalOpen(true);
    };

    const handleAddToBag = async () => {
        let postBody = {productID: selectedItem.productID, color: selectedColor, size: selectedSize, qty:quantity.toString(),}
        let res = await SaveCartRequest(postBody)
        setModalOpen(false);
        setSelectedItem(null);
        if(res){
            await CartListRequest()
            toast.success("Item Added To Your Cart");
        }else{
            toast.error("Something Went Wrong");
        }
    };

    return (
        <section className='bg-white'>
            <div className="md:max-w-5xl container mx-auto px-4 py-8">
                <h1 className="text-black text-3xl font-bold text-center">Wishlist</h1>
                <p className="text-black text-opacity-60 text-base font-medium text-center mb-6">
                    {WishCount} {WishCount === 1 ? "Item" : "Items"}
                </p>

                {WishList.length === 0 ? (
                    <motion.div
                        className="text-center py-10"
                        initial={{opacity: 0, scale: 0.8}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{duration: 0.5, ease: "easeInOut"}}
                    >
                        <motion.div
                            className="inline-block text-secondary mb-4"
                            initial={{scale: 0.8}}
                            animate={{scale: 1}}
                            transition={{
                                repeat: Infinity,
                                repeatType: "reverse",
                                duration: 1.5,
                            }}
                        >
                            <AiOutlineHeart className="text-6xl text-black text-opacity-20"/>
                        </motion.div>
                        <p className="text-black text-opacity-50 text-lg font-medium">
                            Your wishlist is empty! Add items to your wishlist to see them here.
                        </p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                        {WishList.map((item, index) => (
                            <motion.div
                                key={index}
                                className="bg-white shadow-md rounded-lg p-4"
                                whileHover={{scale: 1.05}}
                                transition={{type: "spring", stiffness: 200}}
                            >
                                <img
                                    src={item["product"].image}
                                    alt={item["product"].name}
                                    className="w-full h-48 object-cover rounded-md mb-4"
                                />
                                <h2 className="text-black text-lg font-bold">{item["product"].name}</h2>
                                <p className="text-sm text-black text-opacity-60 mt-1">
                                    Colors: {item["product"].color}
                                </p>
                                {item["product"].discount ? (
                                    <p className="text-xl font-semibold text-secondary mt-1">
                                        ${item["product"].discountPrice}
                                    </p>
                                ) : (
                                    <p className="text-xl font-semibold text-secondary mt-1">
                                        ${item["product"].price}
                                    </p>
                                )}
                                <div className="mt-4 flex justify-between items-center">
                                    <button
                                        onClick={() => handleAddToCart(item)}
                                        className="px-4 py-2 bg-secondary text-white rounded-lg shadow-md hover:bg-secondary"
                                    >
                                        Move to Bag
                                    </button>
                                    <button
                                        onClick={() => handleRemove(item.productID)}
                                        className="px-3 py-2 text-black text-opacity-40 border border-black border-opacity-10 rounded"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Modal */}
                {isModalOpen && selectedItem && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <motion.div
                            className="bg-white p-6 rounded-lg w-96"
                            initial={{opacity: 0, scale: 0.8}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{duration: 0.3}}
                        >
                            <h2 className="text-xl font-bold mb-4">Customize Your Selection</h2>
                            <div className="mb-4">
                                <label className="block font-medium">Color:</label>
                                <select
                                    value={selectedColor}
                                    onChange={(e) => setSelectedColor(e.target.value)}
                                    className="w-full border rounded p-2"
                                >
                                    <option disabled={true} defaultChecked={true} value="">Select Color</option>
                                    {selectedItem['product'].color.split(', ').map((color, index) => (
                                        <option onClick={() => setSelectedColor(color)} key={index} value={color}>
                                            {color}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium">Size:</label>
                                <select
                                    value={selectedSize}
                                    onChange={(e) => setSelectedSize(e.target.value)}
                                    className="w-full border rounded p-2"
                                >
                                    <option disabled={true} defaultChecked={true} value="">Select Size</option>
                                    {selectedItem['product'].size.split(', ').map((size, index) => (
                                        <option onClick={() => setSelectedSize(size)} key={index} value={size}>
                                            {size}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium">Quantity:</label>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    className="w-full border rounded p-2"
                                    min="1"
                                />
                            </div>
                            <div className="flex justify-between">
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="px-4 py-2 bg-gray-200 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddToBag}
                                    className="px-4 py-2 bg-secondary text-white rounded"
                                >
                                    Add to Bag
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default WishList;
