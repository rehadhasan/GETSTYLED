import React from "react";
import ProductStore from "../../store/ProductStore.js";
import Card from "../../ui/products/Card.jsx";

const PopularProduct = () => {
    const {PopularProductList} = ProductStore()

    return (
        <div className='bg-white'>
            <div className="container mx-auto py-8 px-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-black text-opacity-90 text-3xl font-bold">Popular Products</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {PopularProductList.map((product, index) => (
                        <Card product={product} key={index}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PopularProduct;
