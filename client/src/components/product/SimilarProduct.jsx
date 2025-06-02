import React, {useEffect} from "react";
import ProductStore from "../../store/ProductStore.js";
import Card from "../../ui/products/Card.jsx";

const SimilarProduct = () => {
    const {ProductDetails, SimilarProductListRequest, SimilarProductList} = ProductStore();

    useEffect(() => {
        (async () => {
            await SimilarProductListRequest(ProductDetails.categoryID);
        })();
    }, []);

    return (
        <div className='bg-white'>
            <div className="container mx-auto py-8 px-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-black text-opacity-90 lg:text-3xl md:text-2xl text-lg font-bold">Similar Products</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {
                        SimilarProductList !== null ?(
                            SimilarProductList.length !== 0?(
                                SimilarProductList.map((product,index) => (
                                    <Card product={product} key={index}/>
                                ))
                            ):(
                                <span>No Product Found</span>
                            )
                        ):(
                            <span>Loading...</span>
                        )
                    }

                </div>
            </div>
        </div>
    );
};

export default SimilarProduct;
