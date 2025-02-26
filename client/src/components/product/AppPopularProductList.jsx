import React from 'react';
import {Fade} from "react-awesome-reveal";
import Card from "../../ui/products/Card.jsx";
import ProductStore from "../../store/ProductStore.js";

const AppPopularProductList = () => {
    const {PopularProductList} = ProductStore();
    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 md:py-10 py-4">
                <Fade direction="up" duration={800} triggerOnce>
                    <h2 className="text-black text-opacity-90 lg:text-3xl md:text-2xl text-lg font-bold text-center">
                        Popular Products
                    </h2>
                </Fade>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:py-16 md:py-10 py-6">
                    {PopularProductList.map((item, index) => (
                        <Fade key={index} direction="up" duration={800} triggerOnce>
                            <Card product={item} />
                        </Fade>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AppPopularProductList;