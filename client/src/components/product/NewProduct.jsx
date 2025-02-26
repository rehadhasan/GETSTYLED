import React from "react";
import ProductStore from "../../store/ProductStore.js";
import Card from "../../ui/products/Card.jsx";
import {Fade} from "react-awesome-reveal";
import {Link} from "react-router-dom";

const NewProduct = () => {
    const {ForYouProduct} = ProductStore()

    return (
        <div className='bg-white'>
            <div className="container mx-auto px-4 py-10">
                <Fade direction="up" duration={800} triggerOnce>
                    <h2 className="text-black text-opacity-90 lg:text-3xl md:text-2xl text-lg font-bold text-start">Just For You</h2>
                </Fade>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4">
                    {ForYouProduct.slice(0,8).map((product, index) => (
                        <Fade key={index} direction="up" duration={800} triggerOnce>
                            <Card product={product}/>
                        </Fade>
                    ))}
                </div>

                <div className="flex items-center justify-center mt-8">
                    <Fade direction="up" duration={800} triggerOnce>
                        <a
                            href="/new-products"
                            className="text-primary hover:bg-primary hover:text-white px-3 py-2 border border-primary rounded transition ease-in-out duration-300">
                            Browse More
                        </a>
                    </Fade>
                </div>
            </div>
        </div>
    );
};

export default NewProduct;
