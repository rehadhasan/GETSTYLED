import React, { useState } from "react";
import ProductStore from "../../store/ProductStore.js";
import Card from "../../ui/products/Card.jsx";
import { Fade } from "react-awesome-reveal";

const NewProduct = () => {
    const { ForYouProduct } = ProductStore();
    const [visibleProducts, setVisibleProducts] = useState(16);

    // মোট প্রোডাক্ট সংখ্যা
    const totalProducts = ForYouProduct.length;

    // আরও ১৬টি প্রোডাক্ট লোড করা
    const handleLoadMore = () => {
        setVisibleProducts((prev) => prev + 16);
    };

    // প্রথম ১৬টি প্রোডাক্টে ফিরে যাওয়া এবং স্ক্রল টপে নেওয়া
    const handleShowLess = () => {
        setVisibleProducts(16);
        window.scrollTo({ top: document.getElementById("new-products").offsetTop - 50, behavior: "smooth" });
    };

    return (
        <div className="bg-white" id="new-products">
            <div className="container mx-auto px-4 py-10">
                <Fade direction="up" duration={800} triggerOnce>
                    <h2 className="text-black text-opacity-90 lg:text-3xl md:text-2xl text-lg font-bold text-start">
                        Just For You
                    </h2>
                </Fade>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4">
                    {ForYouProduct.slice(0, visibleProducts).map((product, index) => (
                        <Fade key={index} direction="up" duration={800} triggerOnce>
                            <Card product={product} />
                        </Fade>
                    ))}
                </div>

                <div className="flex items-center justify-center mt-8 space-x-4">
                    {visibleProducts < totalProducts && (
                        <Fade direction="up" duration={800} triggerOnce>
                            <button
                                onClick={handleLoadMore}
                                className="text-primary hover:bg-primary hover:text-white px-3 py-2 border border-primary rounded transition ease-in-out duration-300">
                                Browse More
                            </button>
                        </Fade>
                    )}

                    {visibleProducts > 16 && (
                        <Fade direction="up" duration={800} triggerOnce>
                            <button
                                onClick={handleShowLess}
                                className="text-white bg-primary hover:bg-red-600 px-3 py-2 border border-primary rounded transition ease-in-out duration-300">
                                Show Less
                            </button>
                        </Fade>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewProduct;