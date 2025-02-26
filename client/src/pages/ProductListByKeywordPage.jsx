import React, {useEffect} from 'react';
import Layout from "../components/layouts/Layout.jsx";
import AppProductList from "../components/product/AppProductList.jsx";
import ProductStore from "../store/ProductStore.js";
import {useParams} from "react-router-dom";
import Loader from "../components/layouts/Loader.jsx";

const ProductListByKeywordPage = () => {
    const {CategoryListRequest, CategoryList,BrandListRequest,BrandList,ProductListBySearchRequest, AllProductList} = ProductStore()
    const {keyword} = useParams()

    useEffect(() => {
        (async ()=>{
            await CategoryListRequest()
            await BrandListRequest()
            await ProductListBySearchRequest(keyword)
        })()
    }, [keyword]);

    if(CategoryList === null || AllProductList === null || BrandList === null){
        return (
            <Loader/>
        )
    }else{
        return (
            <Layout>
                <AppProductList/>
            </Layout>
        );
    }
};

export default ProductListByKeywordPage;