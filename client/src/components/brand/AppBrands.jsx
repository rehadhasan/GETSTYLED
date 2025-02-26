import React from 'react';
import {Fade} from "react-awesome-reveal";
import {Link} from "react-router-dom";
import ProductStore from "../../store/ProductStore.js";

const AppBrands = () => {
    const {BrandList} = ProductStore();
    return (
        <div className="bg-bg-white">
            <div className="container mx-auto px-4 py-10">
                <Fade direction="up" duration={800} triggerOnce>
                    <h2 className="text-black text-opacity-90 lg:text-3xl md:text-2xl text-lg font-bold text-center">Our Brands</h2>
                </Fade>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 py-4">
                    {BrandList.map((brand) => (
                        <div key={brand.id} className="">
                            <Fade direction="up" duration={800} triggerOnce>
                                <Link to={`/by-category/${brand._id}`}
                                      className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4 my-4 flex flex-col items-center">
                                    <img
                                        src={brand.brandImg}
                                        alt={brand.brandName}
                                        className="w-24 h-24 rounded-md object-cover mb-3"
                                    />
                                    <h3 className="md:text-lg text-sm font-medium text-black text-opacity-700 truncate">{brand.brandName}</h3>
                                </Link>
                            </Fade>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AppBrands;