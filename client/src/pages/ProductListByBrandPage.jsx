import React, {useEffect} from 'react';
import Layout from "../components/layouts/Layout.jsx";
import ProductList from "../components/product/ProductList.jsx";
import ProductStore from "../store/ProductStore.js";
import {useParams} from "react-router-dom";
import Loader from "../components/layouts/Loader.jsx";

const ProductListByBrandPage = () => {
    const {CategoryListRequest, CategoryList,BrandListRequest,BrandList, ProductListByBrandRequest, AllProductList} = ProductStore()
    const {brandID} = useParams()

    useEffect(() => {
        (async ()=>{
            await CategoryListRequest()
            await BrandListRequest()
            await ProductListByBrandRequest(brandID)
        })()
    }, [brandID]);

    if(CategoryList === null || AllProductList === null || BrandList === null){
        return (
            <Loader/>
        )
    }else{
        return (
            <Layout>
                <ProductList/>
            </Layout>
        );
    }
};

export default ProductListByBrandPage;