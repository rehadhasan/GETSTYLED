import React, { useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { FaShoppingBag } from 'react-icons/fa';
import FilterModal from "../../ui/products/FilterModal.jsx";
import ReactPaginate from 'react-paginate';
import ProductStore from "../../store/ProductStore.js";
import {Link} from "react-router-dom";
import { toast } from 'react-toastify';
import Card from "../../ui/products/Card.jsx";

export default function ProductList() {
    const {AllProductList, ProductListByFilterRequest, CategoryList,BrandList} = ProductStore()

    const [filterOpen, setFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = 8; // Display 8 products per page

    const applyFilters = async (searchKeyword, selectedBrand, selectedCategory,rating,priceMin, priceMax) => {
        let postBody = {
            keyword: searchKeyword || "",
            brandID: selectedBrand || "",
            categoryID: selectedCategory || "",
            rating: rating ? rating.toString() : "",
            priceMin: priceMin.toString(),
            priceMax: priceMax.toString()
        };

        console.log(postBody); // Debugging purpose
        let res = await ProductListByFilterRequest(postBody);

        if (res) {
            toast.success('Items Filtered Successfully');
        } else {
            toast.error('Something Went Wrong!');
        }
    };


    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    // Calculate which products to show based on current page
    const paginatedProducts = AllProductList.slice(
        currentPage * productsPerPage,
        (currentPage + 1) * productsPerPage
    );

    return (
        <section className='bg-bg-white'>
            <div className="container mx-auto px-4 py-8">
                <header className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2 text-black text-opacity-80">
                        <Link to='/'><AiOutlineArrowLeft size={24}/></Link>
                        <span className="text-lg font-semibold">{AllProductList.length} item's found</span>
                    </div>
                    <button
                        onClick={() => setFilterOpen(true)}
                        className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg"
                    >
                        Filter
                    </button>
                </header>

                {
                    AllProductList.length > 0? (
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
                            {paginatedProducts.map(product => (
                                <Card product={product} key={product.id}/>
                            ))}
                        </div>
                    ): (
                        <div className="flex justify-center items-center h-full py-8">
                            <span className='text-black text-opacity-30 text-sm font-medium'>Product List Empty.</span>
                        </div>
                    )
                }

                {filterOpen && (
                    <FilterModal
                        setFilterOpen={setFilterOpen}
                        applyFilters={applyFilters}
                        CategoryList={CategoryList}
                        BrandList={BrandList}
                    />
                )}

                {/* Pagination Controls */}
                {
                    AllProductList.length > 0?(
                        <div className="flex justify-center mt-10">
                            <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                breakLabel={"..."}
                                pageCount={Math.ceil(AllProductList.length / productsPerPage)}
                                onPageChange={handlePageChange}
                                containerClassName={"flex space-x-3 items-center"}
                                activeClassName={"bg-primary text-white rounded-full"}
                                pageClassName={"bg-gray-200 text-gray-700 md:px-4 px-3 md:py-2 py-1 rounded-full cursor-pointer hover:bg-primary hover:text-white"}
                                pageLinkClassName={"block"}
                                disabledClassName={"text-gray-300 cursor-not-allowed"}
                            />
                        </div>
                    ):('')
                }
            </div>
        </section>
    );
}
