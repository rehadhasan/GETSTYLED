import React from "react";
import Slider from "react-slick"; // Import the react-slick package
import { Fade } from "react-awesome-reveal";
import ProductStore from "../../store/ProductStore.js";
import {Link} from "react-router-dom";

const Category = () => {
    const {CategoryList} = ProductStore()

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-black text-opacity-90 text-3xl font-bold mb-4 text-start">Browse Categories</h2>
                <div className="w-full overflow-hidden">
                    <Slider {...settings} className="w-full max-w-full">
                        {CategoryList.map((category) => (
                            <div key={category.id} className="px-2">
                                <Fade direction="up" duration={800} triggerOnce>
                                    <Link to={`/by-category/${category._id}`}
                                          className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4 my-4 flex flex-col items-center">
                                        <img
                                            src={category.categoryImg}
                                            alt={category.categoryName}
                                            className="w-24 h-24 rounded-md object-cover mb-3"
                                        />
                                        <h3 className="text-lg font-medium text-black text-opacity-700 truncate">{category.categoryName}</h3>
                                    </Link>
                                </Fade>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default Category;
