import React, {useState} from 'react';
import { motion } from 'framer-motion';
import {AiOutlineHeart} from 'react-icons/ai';
import { BsCartPlus } from 'react-icons/bs';
import {FaInfoCircle, FaStar} from 'react-icons/fa';
import { CiShare2 } from "react-icons/ci";
import ProductStore from "../../store/ProductStore.js";
import parse from 'html-react-parser';
import ReviewStore from "../../store/ReviewStore.js";
import { toast } from 'react-toastify';
import {useParams} from "react-router-dom";
import CartStore from "../../store/CartStore.js";
import WishStore from "../../store/WishStore.js";

const Details = () => {
    const {ProductDetails, PopularProductList} = ProductStore()
    const {isCartSubmit,  SaveCartRequest, CartListRequest} = CartStore()
    const {isWishSubmit, SaveWishRequest, WishListRequest} = WishStore()
    const {ReviewList} = ReviewStore()

    const {productID} = useParams()

    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [activeImage, setActiveImage] = useState(ProductDetails['details'].img1);
    const [toastShown, setToastShown] = useState(false);

    const handleShareClick = async () => {
        // Define the content you want to copy (in this case, the window URL or any other content)
        const contentToCopy = window.location.href; // Copying the current window URL

        try {
            // Copy the content to the clipboard using async/await
            await navigator.clipboard.writeText(contentToCopy);
            if(!toastShown){
                toast.success('Link Copied !')
                setToastShown(true);

                // Automatically reset toastShown after 3 seconds
                setTimeout(() => {
                    setToastShown(false); // Reset to allow new toast
                }, 3000); // 3-second delay
            }
            console.log("Link Copied !")
        } catch (e) {
            toast.error('Link Copied Failed !')
            console.log(e.toString())
        }
    };

    const checkSelections = () => {
        if (!selectedColor || !selectedSize || quantity <= 0) {
            toast.error('Please select a color, size, and quantity before proceeding.')
            return false;
        }
        return true;
    }

    const handleCartList = async () => {
        if (checkSelections()) {
            let postBody = {
                productID: productID,
                color: selectedColor,
                size: selectedSize,
                qty: quantity.toString()
            }
            let res = await SaveCartRequest(postBody)
            if(res){
                await CartListRequest()
                toast.success("Item Added To Your Cart Successfully")
            }else{
                toast.error("Something Went Wrong")
            }
        }
    }
    
    const handleWishList = async () => {
        let res = await SaveWishRequest(productID)
        if(res){
            await WishListRequest()
            toast.success("Item Added To Your AppWishList")
        }else{
            toast.error("Something Went Wrong")
        }
    }
    return (
        <section className='bg-bg-white'>
            <div className="container mx-auto px-4 py-8">
                {/* Product details section */}
                <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-1 gap-5">
                    {/* Main Image */}
                    <div className="md:col-span-2 col-span-1 flex flex-col items-center">
                        {/* Main Image */}
                        <div className='w-full h-[400px] rounded-lg overflow-hidden'>
                            <motion.img
                                src={activeImage}
                                alt={ProductDetails.name}
                                className="w-full h-full object-cover" // Fixed width
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{duration: 1}}
                            />
                        </div>
                        {/* Image Thumbnails */}
                        <div className="mt-4 flex space-x-2 justify-center">
                            {['img1', 'img2', 'img3', 'img4'].map((key, index) => (
                                <motion.img
                                    key={index}
                                    src={ProductDetails['details'][key]}
                                    alt={ProductDetails.name}
                                    className={`w-16 h-16 rounded-md cursor-pointer border ${
                                        activeImage === ProductDetails['details'][key] ? 'ring-2 ring-blue-500' : ''
                                    }`}
                                    whileHover={{scale: 1.05}}
                                    whileTap={{scale: 0.95}}
                                    onClick={() => setActiveImage(ProductDetails['details'][key])}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Product details */}
                    <div className="md:col-span-2 col-span-1 space-y-4">
                        <div className='flex flex-col space-y-4'>
                            <p className='text-black text-opacity-60 text-base font-medium'>Brand: <span
                                className='text-secondary font-normal'>{ProductDetails['brand'].brandName}</span></p>
                            <h2 className="lg:text-3xl md:text-2xl text-lg font-normal text-black">{ProductDetails.name}</h2>
                            <p className='text-black text-base font-normal'>{parse(ProductDetails['details'].description.split(' ').slice(0, 30).join(' ')+ '..')}</p>
                        </div>
                        <div className='flex items-center justify-between gap-5 lg:pr-14 md:pr-8 pr-0'>
                            <div
                                className={`flex items-center space-x-2 my-2 ${ProductDetails.averageRating ? 'text-yellow-500' : 'text-black text-opacity-40'}`}>
                                <span>{ProductDetails.averageRating > 0 ? (ProductDetails.averageRating.toFixed(1)) : ('0.0')} ★</span>
                                <span className="text-black">({ProductDetails.reviewCount} review)</span>
                            </div>
                            <span className='text-black text-opacity-60 text-lg font-normal'>{ProductDetails.stock} Sold</span>
                            <div className='flex items-center gap-2 cursor-pointer text-black text-opacity-60' onClick={handleShareClick}>
                                <CiShare2 className="text-xl"/>
                                <span className="text-sm font-medium">Share</span>
                            </div>
                        </div>
                        <hr/>
                        {
                            ProductDetails.discount ? (
                                <div className="flex items-center space-x-4">
                                    <span
                                        className="text-2xl font-bold text-secondary">${ProductDetails.discountPrice}</span>
                                    <span
                                        className="text-lg line-through text-black text-opacity-50">${ProductDetails.price}</span>
                                    <span className="text-md text-green">
                                        {Math.round(
                                            ((ProductDetails.price - ProductDetails.discountPrice) / ProductDetails.price) * 100
                                        )}
                                        % OFF
                                    </span>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <span className="text-2xl font-bold text-secondary">${ProductDetails.price}</span>
                                </div>
                            )
                        }
                        <hr/>

                        {/* Color and size options */}
                        <div className="space-y-2">
                            <p className="text-black text-opacity-70 font-semibold">Color:</p>
                            <div className="flex space-x-3">
                                {ProductDetails.color.split(' ').map((color) => (
                                    <motion.button
                                        key={color}
                                        className={`w-8 h-8 rounded-full border border-black border-opacity-30 ${
                                            selectedColor === color ? 'ring-2 ring-blue' : ''
                                        }`}
                                        style={{backgroundColor: color.toLowerCase()}}
                                        onClick={() => setSelectedColor(color)}
                                        whileTap={{scale: 0.95}}
                                    />
                                ))}
                            </div>
                        </div>
                        <hr/>

                        <div className="space-y-2">
                            <p className="text-black text-opacity-70 font-semibold">Size:</p>
                            <div className="flex space-x-3">
                                {ProductDetails.size.split(', ').map((size) => (
                                    <motion.button
                                        key={size}
                                        className={`px-4 py-2 border rounded-md ${
                                            selectedSize === size ? 'border-blue text-blue' : 'border-black border-opacity-50 text-black text-opacity-50'
                                        }`}
                                        onClick={() => setSelectedSize(size)}
                                        whileHover={{scale: 1.05}}
                                    >
                                        {size}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                        <hr/>

                        {/* Quantity Control */}
                        <div className="space-y-2">
                            <p className="text-black text-opacity-70 font-semibold">Quantity:</p>
                            <div className="flex items-center space-x-3">
                                <motion.button
                                    onClick={() => {quantity > 1?(setQuantity(quantity - 1)):''}}
                                    className="px-3 py-1 bg-black bg-opacity-5 rounded-md text-black text-opacity-70 hover:bg-black hover:bg-opacity-10"
                                    whileTap={{scale: 0.95}}
                                >
                                    -
                                </motion.button>
                                <span className="text-lg font-semibold">{quantity}</span>
                                <motion.button
                                    onClick={() => {setQuantity(quantity + 1)}}
                                    className="px-3 py-1 bg-black bg-opacity-5 rounded-md text-black text-opacity-70 hover:bg-black hover:bg-opacity-10"
                                    whileTap={{scale: 0.95}}
                                >
                                    +
                                </motion.button>
                            </div>
                        </div>
                        <hr/>

                        {/* Action buttons */}
                        <div className="flex space-x-4">
                            {
                                !isCartSubmit?(
                                    <motion.button
                                        onClick={handleCartList}
                                        className="flex items-center justify-center lg:text-base text-sm px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-primary transition-colors"
                                    >
                                        <BsCartPlus className="mr-2"/>
                                        Add to Cart
                                    </motion.button>
                                ): (
                                    <motion.button
                                        className="flex items-center justify-center lg:text-base text-sm gap-2 px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-primary transition-colors"
                                    >
                                        <span>Loading</span>
                                        <span className="loading loading-spinner loading-sm"></span>
                                    </motion.button>
                                )
                            }
                            {
                                !isWishSubmit?(
                                    <motion.button
                                        onClick={handleWishList}
                                        className="flex items-center justify-center lg:text-base text-sm px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-primary transition-colors"
                                    >
                                        Add To Wish
                                    </motion.button>
                                ): (
                                    <motion.button
                                        className="flex items-center justify-center lg:text-base text-sm gap-2 px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-primary transition-colors"
                                    >
                                        <span>Loading</span>
                                        <span className="loading loading-spinner loading-sm"></span>
                                    </motion.button>
                                )
                            }
                        </div>
                    </div>

                    {/* Product Adds */}
                    <div className='col-span-1 lg:block hidden'>
                        <h3 className='text-lg text-black font-medium'>Popular Products For You</h3>
                        <div className='grid grid-cols-1 gap-4 mt-4'>
                            {/*Product Adds Item*/}
                            {
                                PopularProductList.slice(0,5).map((product, index) => {
                                    return (

                                        <motion.div
                                            whileHover={{scale: 1.05}}
                                            key={index}
                                            className='grid grid-cols-3 border-2 border-gray-100 rounded-md overflow-hidden'
                                        >
                                            <div className='col-span-1 h-full overflow-hidden'>
                                                <img className='w-full h-full object-cover'
                                                     src={product.image}
                                                     alt={product.name}/>
                                            </div>
                                            <div
                                                className='col-span-2 flex flex-col items-start gap-1 p-2 text-sm text-black font-normal'>
                                                <h3>{product.name}</h3>
                                                {
                                                    product.discount ? (
                                                        <div className='flex items-center gap-2'>
                                                            <p className='text-secondary font-medium'>${product.discountPrice}</p>
                                                            <span className='text-black text-opacity-60'>
                                                                {Math.round(
                                                                    ((ProductDetails.price - ProductDetails.discountPrice) / ProductDetails.price) * 100
                                                                )}
                                                                % off
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <div className='flex items-center gap-2'>
                                                            <p className='text-secondary font-medium'>${product.price}</p>
                                                        </div>
                                                    )
                                                }
                                                <div className='flex items-center gap-1'>
                                                    <FaStar className='text-base text-yellow-500'/>
                                                    <p className='font-semibold'>{product.averageRating > 0?(product.averageRating.toFixed(1)):'0.0'}</p>
                                                    <span>({product.reviewCount} Reviews)</span>
                                                </div>
                                                <a href={`/details/${product._id}`} className='text-blue underline'>Shop Now</a>
                                            </div>
                                        </motion.div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="w-full mt-8">
                    <div className="flex border-b border-gray-200">
                    <motion.button
                            className={`py-2 px-4 font-semibold flex items-center ${
                                activeTab === 'description' ? 'text-blue border-b-2 border-blue' : 'text-black text-opacity-50'
                            }`}
                            onClick={() => setActiveTab('description')}
                            whileTap={{scale: 0.95}}
                        >
                            <FaInfoCircle className="mr-2"/> Product Description
                        </motion.button>
                        <motion.button
                            className={`py-2 px-4 font-semibold flex items-center ${
                                activeTab === 'reviews' ? 'text-blue border-b-2 border-blue' : 'text-black text-opacity-50'
                            }`}
                            onClick={() => setActiveTab('reviews')}
                            whileTap={{scale: 0.95}}
                        >
                            <FaStar className="mr-2"/> Reviews
                        </motion.button>
                    </div>

                    {/* Tab content */}
                    <div className="rounded-lg p-5">
                        {activeTab === 'description' && (
                            <motion.div
                                initial={{opacity: 0, y: 10}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.4}}
                                className="text-black text-opacity-90 p-4 border rounded-lg bg-white shadow-sm"
                            >
                                {parse(ProductDetails['details'].description)}
                            </motion.div>
                        )}

                        {activeTab === 'reviews' && (
                            <motion.div
                                initial={{opacity: 0, y: 10}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.4}}
                                className="p-4 border rounded-lg bg-white shadow-sm"
                            >
                                {
                                    ReviewList.reviews.length > 0?(
                                        <div>
                                            <h3 className="text-black text-opacity-90 text-lg font-medium mb-2">Customer Reviews</h3>
                                            <div className="space-y-4">
                                                {
                                                    ReviewList.reviews.map((review) => {
                                                        return (
                                                            <div key={review.id}
                                                                 className="p-4 border rounded-lg bg-gray-50 shadow-sm">
                                                                <p className="text-gray-700 flex flex-col gap-2">
                                                                    <div className='flex gap-1'>
                                                                        {[...Array(5)].map((_, index) => (
                                                                            <FaStar key={index}
                                                                                    className="text-yellow-400"/>
                                                                        ))}
                                                                    </div>
                                                                    <span
                                                                        className="font-semibold">{review['userInfo'].name}:</span>
                                                                    <span className="">{review.comment}</span>
                                                                </p>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex justify-center items-center h-full py-8">
                                            <span className='text-black text-opacity-30 text-sm font-medium'>No Reviews Yet.</span>
                                        </div>
                                    )
                                }
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Details;
