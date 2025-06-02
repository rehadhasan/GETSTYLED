import React, { useState } from 'react';
import { Fade } from "react-awesome-reveal";
import Card from "../../ui/products/Card.jsx";
import ProductStore from "../../store/ProductStore.js";
import { FaSearch } from 'react-icons/fa';
import FilterModal from "../../ui/products/FilterModal.jsx";
import {toast} from "react-toastify";

const ProductList = () => {
    const { ListProducts, isLoading, CategoryList, BrandList, ProductListByFilterRequest } = ProductStore();
    const [visibleProducts, setVisibleProducts] = useState(16);
    const [filterOpen, setFilterOpen] = useState(false); // State to control modal visibility

    const totalProducts = ListProducts.length;

    const handleLoadMore = () => {
        setVisibleProducts((prev) => prev + 16);
    };

    const handleShowLess = () => {
        setVisibleProducts(16);
        window.scrollTo({ top: document.getElementById("list-products").offsetTop - 50, behavior: "smooth" });
    };

    const handleFilter = async (searchKeyword, selectedBrand, selectedCategory,rating,priceMin, priceMax) => {
        let postBody = {
            "keyword":searchKeyword,
            "brandID":selectedBrand,
            "categoryID":selectedCategory,
            "rating":rating.toString(),
            "priceMin":priceMin.toString(),
            "priceMax":priceMax
        }
        let res  = await ProductListByFilterRequest(postBody);
        if(res){
            toast.success("Product list filter successfully");
        }else{
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="bg-white relative" id="list-products">
            {/* Overlay when loading */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 z-10">
                    <p className="text-white text-3xl">Loading...</p>
                </div>
            )}

            <div className="container mx-auto px-4 py-10">
                {/* Show a message if no products */}
                {totalProducts === 0 ? (
                    <div className="text-center text-lg text-black text-opacity-50">
                        <p>No Products Available</p>
                    </div>
                ) : (
                    <div className="flex items-center space-x-2 text-black text-opacity-70 text-sm mb-4">
                        <FaSearch />
                        <p className="text-base text-medium">{totalProducts} items found</p>
                    </div>
                )}

                {/* Filter Button - Positioned at the top right */}
                <button
                    onClick={() => setFilterOpen(true)}
                    className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-md mt-4">
                    Filter
                </button>

                {/* Display products */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4">
                    {ListProducts.slice(0, visibleProducts).map((product, index) => (
                        <Fade key={index} direction="up" duration={800} triggerOnce>
                            <Card product={product} />
                        </Fade>
                    ))}
                </div>

                {/* Load More / Show Less buttons */}
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

            {/* Filter Modal */}
            {filterOpen && (
                <FilterModal
                    setFilterOpen={setFilterOpen}
                    applyFilters={handleFilter}
                    CategoryList={CategoryList}
                    BrandList={BrandList}
                />
            )}
        </div>
    );
};

export default ProductList;