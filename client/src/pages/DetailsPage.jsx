import React, { useEffect } from 'react';
import Layout from "../components/layouts/Layout.jsx";
import Details from "../components/product/Details.jsx";
import SimilarProduct from "../components/product/SimilarProduct.jsx";
import ProductStore from "../store/ProductStore.js";
import { useParams } from "react-router-dom";
import ReviewStore from "../store/ReviewStore.js";
import Loader from "../components/layouts/Loader.jsx";

const DetailsPage = () => {
    const {CategoryListRequest, CategoryList, ProductDetailsRequest, ProductDetails, SimilarProductListRequest, SimilarProductList, PopularProductListRequest, PopularProductList} = ProductStore();
    const {ReviewListRequest, ReviewList} = ReviewStore()

    const { productID } = useParams();

    useEffect(() => {
        (async () => {
            await CategoryListRequest();
            await ProductDetailsRequest(productID);
            if (ProductDetails && ProductDetails.categoryID) {
                await SimilarProductListRequest(ProductDetails.categoryID);
            }
            await PopularProductListRequest();
            await ReviewListRequest(productID)
        })();
    }, [productID, ProductDetails?.categoryID]);

    if (
        CategoryList === null ||
        ProductDetails === null ||
        SimilarProductList === null ||
        PopularProductList === null ||
        ReviewList === null
    ) {
        return(
            <Loader/>
        )
    } else {
        return (
            <Layout>
                <Details />
                <SimilarProduct />
            </Layout>
        );
    }
};

export default DetailsPage;
