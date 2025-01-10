import React from "react";
import Slider from "react-slick";
import ProductStore from "../../store/ProductStore.js";
import {Link} from "react-router-dom";

const Brand = () => {
    const {BrandList} = ProductStore()

    const settings = {
        infinite: true, // Infinite loop of slides
        speed: 3000, // Speed of the scroll
        autoplay: true, // Enable auto-scroll
        autoplaySpeed: 0, // Auto-scroll delay (0 means continuous scroll)
        slidesToShow: 5, // Number of slides to show at once
        slidesToScroll: 1, // Number of slides to scroll at once
        cssEase: "linear", // Smooth scrolling effect
        responsive: [
            {
                breakpoint: 1024, // Medium screens (tablets)
                settings: {
                    slidesToShow: 3, // Show 3 slides on medium screens
                },
            },
            {
                breakpoint: 768, // Small screens (phones)
                settings: {
                    slidesToShow: 2, // Show 2 slides on small screens
                },
            },
            {
                breakpoint: 480, // Extra small screens (small phones)
                settings: {
                    slidesToShow: 1, // Show 1 slide on very small screens
                },
            },
        ],
    };

    return (
        <div className="bg-bg-white">
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-3xl font-extrabold text-start text-black text-opacity-90 mb-12">
                    Browse Our Brands
                </h2>
                <Slider {...settings} className="overflow-hidden">
                    {BrandList.map((brand) => (
                        <div key={brand.id}>
                            <Link to={`/by-brand/${brand._id}`} className="flex flex-col items-center p-6 m-4 bg-gradient-to-t from-gray-100 to-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out">
                                <div rel="noopener noreferrer">
                                    <img
                                        src={brand.brandImg}
                                        alt={brand.brandName}
                                        className="w-28 h-28 object-contain mb-4"
                                    />
                                </div>
                                <p className="text-center mt-4 text-gray-800 font-semibold text-xl">
                                    {brand.brandName}
                                </p>
                            </Link>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Brand;
