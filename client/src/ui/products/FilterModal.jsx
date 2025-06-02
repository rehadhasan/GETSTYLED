import React, { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { RxCross2 } from "react-icons/rx";
import {toast} from "react-toastify";

const FilterModal = ({ setFilterOpen, applyFilters, CategoryList, BrandList }) => {

    const [rating, setRating] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [priceMax, setPriceMax] = useState(500);
    const [priceMin, setPriceMin] = useState(0);
    const [searchKeyword, setSearchKeyword] = useState(""); // State for search keyword

    const handleMaxChange = (e) => {
        setPriceMax(e.target.value);
    };

    const handleFilter = () => {
        if (rating === null) {
            toast.error("Rating is required!")
        }else if (priceMax === 0){
            toast.error("Price range is required!")
        }else{
            applyFilters(searchKeyword, selectedBrand, selectedCategory, rating, priceMin, priceMax);
            setFilterOpen(false);
        }
    }

    return (
        <div className="fixed inset-0 flex justify-end z-50">
            {/* Overlay */}
            <div
                className="bg-gray-900 bg-opacity-50 w-full h-full"
                onClick={() => setFilterOpen(false)}
            />

            {/* Filter Sidebar */}
            <motion.div
                className="bg-white h-full min-w-[80%] sm:min-w-[50%] md:min-w-[40%] lg:min-w-[30%] max-w-lg shadow-lg p-6 overflow-y-auto"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
            >
                {/* Close Button */}
                <button
                    onClick={() => setFilterOpen(false)}
                    className="absolute top-4 right-4 text-secondary hover:text-white p-2 border border-secondary rounded-full hover:bg-secondary transition-all duration-300 ease-in-out"
                    aria-label="Close"
                >
                    <RxCross2 />
                </button>

                <h2 className="text-black text-opacity-90 text-xl font-semibold mb-4">Filter</h2>

                {/* Search Box */}
                <div className="mb-4">
                    <label className="text-black text-opacity-90 block font-medium mb-2">Search</label>
                    <input
                        type="text"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        placeholder="Search products..."
                        className="w-full px-3 py-2 border bg-white text-black focus:border-black focus:outline-none rounded-lg"
                    />
                </div>

                {/* Rating Filter */}
                <div className="mb-4">
                    <label className="text-black text-opacity-90 block font-medium mb-2">Customer Review</label>
                    <div className="flex flex-col gap-2">
                        {[5, 4, 3, 2, 1].map(stars => (
                            <label
                                key={stars}
                                className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg ${
                                    rating === stars ? 'bg-secondary' : 'hover:bg-black hover:bg-opacity-5'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="rating"
                                    value={stars}
                                    checked={rating === stars}
                                    onChange={() => setRating(stars)}
                                    className="hidden"
                                />
                                <div className="flex items-center">
                                    {[...Array(stars)].map((_, i) => (
                                        <AiFillStar key={i} className="text-orange-300" />
                                    ))}
                                    {[...Array(5 - stars)].map((_, i) => (
                                        <AiOutlineStar key={i} className="text-black text-opacity-40" />
                                    ))}
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-4">
                    <label className="block font-medium mb-2 text-black">Price Range</label>
                    <div className="relative flex items-center">
                        {/* Single Range Slider */}
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            value={priceMax}
                            onChange={handleMaxChange}
                            className="range range-xs w-full" // Background color for slider
                        />
                    </div>

                    {/* Display Selected Range */}
                    <div className="flex justify-between text-sm mt-2 text-gray-700">
                        <span>Min: $0</span>
                        <span>Max: ${priceMax}</span>
                    </div>
                </div>

                {/* Brand Filter */}
                <div className="mb-4">
                    <label className="text-black text-opacity-90 block font-medium mb-2">Brand</label>
                    <select
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg bg-white text-black"
                    >
                        <option value="">All Brands</option>
                        {/* eslint-disable-next-line react/prop-types */}
                        {BrandList.map((brand) => (
                            <option key={brand.id} value={brand._id}>{brand.brandName}</option>
                        ))}
                    </select>
                </div>

                {/* Category Filter */}
                <div className="mb-4">
                    <label className="text-black text-opacity-90 block font-medium mb-2">Category</label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg bg-white text-black"
                    >
                        <option value="">All Categories</option>
                        {/* eslint-disable-next-line react/prop-types */}
                        {CategoryList.map((category) => (
                            <option key={category.id} value={category._id}>{category.categoryName}</option>
                        ))}
                    </select>
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-6">
                    <button
                        onClick={() => {
                            setRating(null);
                            setPriceMax(500);
                            setSelectedBrand("");
                            setSelectedCategory("");
                            setSearchKeyword(""); // Reset search keyword
                        }}
                        className="border border-secondary text-secondary px-4 py-2 rounded-lg"
                    >
                        Clear
                    </button>
                    <button
                        onClick={handleFilter}
                        className="bg-secondary hover:bg-secondary text-white px-4 py-2 rounded-lg"
                    >
                        Apply
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default FilterModal;
