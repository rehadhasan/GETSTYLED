import React from 'react';
import {motion} from "framer-motion";
import {FaShoppingBag} from "react-icons/fa";

const Card = ({product}) => {
    return (
        <motion.div
            whileHover={{scale: 1.05}}
            className="p-4 border rounded-lg bg-white shadow-lg"
        >
            <div className='w-full h-[188px] overflow-hidden mb-4 rounded'>
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <h3 className="text-black text-base font-normal truncate">{product.name}</h3>
            {product.discount ? (
                <div className="flex items-center gap-3">
                    <p className="text-red-500 text-lg font-bold">${product.discountPrice}</p>
                    <p className="text-gray-500 line-through">${product.price}</p>
                </div>
            ) : (
                <p className="text-red-500 text-lg font-bold">${product.price}</p>
            )}
            <div
                className={`flex items-center space-x-2 my-2 ${product.averageRating ? 'text-yellow-500' : 'text-black text-opacity-40'}`}>
                <span>{product.averageRating > 0 ? (product.averageRating.toFixed(1)) : ('0.0')} ★</span>
                <span className="text-black">({product.reviewCount} review)</span>
            </div>
            {
                product.stock > 0 ? (
                    <motion.a
                        className={`mt-4 w-full flex items-center justify-center py-2 rounded bg-primary hover:bg-primary text-white`}
                        href={`/details/${product._id}`}
                    >
                        <FaShoppingBag className="mr-2"/>
                        Buy Now
                    </motion.a>
                ) : (
                    <motion.button
                        className={`mt-4 w-full flex items-center justify-center py-2 rounded bg-gray-400 text-gray-600 cursor-not-allowed`}
                    >
                        <FaShoppingBag className="mr-2"/>
                        Stock Out
                    </motion.button>
                )
            }
        </motion.div>
    );
};

export default Card;