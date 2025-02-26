import React from 'react';
import {Fade} from "react-awesome-reveal";
import {Link} from "react-router-dom";
import ProductStore from "../../store/ProductStore.js";

const AppCategories = () => {
    const {CategoryList} = ProductStore();
    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 py-10">
                <Fade direction="up" duration={800} triggerOnce>
                    <h2 className="text-black text-opacity-90 lg:text-3xl md:text-2xl text-lg font-bold text-center">Our Categories</h2>
                </Fade>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 py-4">
                    {CategoryList.map((category) => (
                        <div key={category.id} className="">
                            <Fade direction="up" duration={800} triggerOnce>
                                <Link to={`/by-category/${category._id}`}
                                      className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 p-2 my-4 flex flex-col items-center">
                                    <img
                                        src={category.categoryImg}
                                        alt={category.categoryName}
                                        className="w-24 h-24 rounded-md object-cover mb-3"
                                    />
                                    <h3 className="md:text-lg text-sm font-medium text-black text-opacity-700 text-center">{category.categoryName}</h3>
                                </Link>
                            </Fade>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AppCategories;