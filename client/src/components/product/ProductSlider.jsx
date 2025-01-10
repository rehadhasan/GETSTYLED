import React from 'react';
import Slider from "react-slick";
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import ProductStore from "../../store/ProductStore.js";
import {Link} from "react-router-dom";

const ProductSlider = () => {
    const {ProductSliderList, AdsList} = ProductStore()

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, // Auto-scroll
        autoplaySpeed: 3000, // Auto-scroll interval
        prevArrow: <CustomPrevArrow />, // Custom previous arrow
        nextArrow: <CustomNextArrow />, // Custom next arrow
    };

    return (
        <div className="bg-white py-8">
            <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between items-start">
                <div className="w-full lg:w-3/4 relative">
                    <Slider {...settings}>
                        {ProductSliderList.map((slide, index) => (
                            <div key={index}>
                                <div
                                    className="relative w-full md:h-96 h-64 bg-cover bg-center bg-no-repeat rounded overflow-hidden"
                                    style={{ backgroundImage: `url(${slide.image})` }}
                                >
                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/60 to-transparent flex items-center px-8">
                                        <div className="text-white">
                                            <motion.h2
                                                className="lg:text-4xl md:text-xl text-lg font-bold"
                                                initial={{ opacity: 0, x: -100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.6 }}
                                            >
                                                {slide.title}
                                            </motion.h2>
                                            <motion.p
                                                className="lg:text-5xl md:text-4xl text-2xl font-bold mt-2"
                                                initial={{ opacity: 0, x: -100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.8 }}
                                            >
                                                {slide.subTitle}
                                            </motion.p>
                                            {slide.description && (
                                                <motion.p
                                                    className="mt-4 mb-8"
                                                    initial={{ opacity: 0, x: -100 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 1 }}
                                                >
                                                    {slide.description}
                                                </motion.p>
                                            )}
                                            <motion.a
                                                className="bg-bg-primary hover:bg-bg-secondary text-white lg:px-6 lg:py-3 px-4 py-2 rounded transition-transform transform hover:scale-105"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 1.2 }}
                                                href={`/details/${slide.productID}`}
                                            >
                                                {slide.buttonText}
                                            </motion.a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

                {/* Right Side Ad Section */}
                <div className="w-full lg:w-1/4 mt-8 lg:mt-0 lg:pl-4">
                    {
                        AdsList.slice(0,2).map((adds,index)=>{
                            return (
                                <Link className="mb-4" to={`/details/${adds.productID}`} key={index}>
                                    <div className='w-full lg:h-48 md:h-96 h-64 rounded overflow-hidden object-cover'>
                                        <img
                                            src={adds.thumbnail}
                                            alt={adds.title}
                                            className="w-full h-full"
                                        />
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

// Custom previous arrow button
const CustomPrevArrow = ({onClick}) => {
    return (
        <button
            className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-bg-white text-black p-3 rounded-lg shadow-lg hover:bg-bg-white transition-colors z-10"
            onClick={onClick}
        >
            <IoIosArrowBack />
        </button>
    );
};

// Custom next arrow button
const CustomNextArrow = ({ onClick }) => {
    return (
        <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-bg-white text-black p-3 rounded-lg shadow-lg hover:bg-bg-white transition-colors z-10"
            onClick={onClick}
        >
            <IoIosArrowForward />
        </button>
    );
};

export default ProductSlider;
