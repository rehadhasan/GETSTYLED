import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import ProductStore from "../../store/ProductStore.js";
import Card from "../../ui/products/Card.jsx";

const NewProduct = () => {
    const {ForYouProduct} = ProductStore()
    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = 8; // Display 8 products per page

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    // Calculate which products to show based on current page
    const paginatedProducts = ForYouProduct.slice(
        currentPage * productsPerPage,
        (currentPage + 1) * productsPerPage
    );

    return (
        <div className='bg-bg-white'>
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-black text-opacity-90 text-3xl font-bold text-start mb-6">Just For You</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {paginatedProducts.map((product,index) => (
                        <Card product={product} key={index}/>
                    ))}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center mt-10">
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        pageCount={Math.ceil(ForYouProduct.length / productsPerPage)}
                        onPageChange={handlePageChange}
                        containerClassName={"flex space-x-3 items-center"}
                        activeClassName={"bg-primary text-white rounded-full"}
                        pageClassName={"bg-gray-200 text-gray-700 md:px-4 px-3 md:py-2 py-1 rounded-full cursor-pointer hover:bg-primary hover:text-white"}
                        pageLinkClassName={"block"}
                        disabledClassName={"text-gray-300 cursor-not-allowed"}
                    />
                </div>
            </div>
        </div>
    );
};

export default NewProduct;
