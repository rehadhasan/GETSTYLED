import React, {useEffect} from 'react';
import Layout from "../components/layouts/Layout.jsx";
import ProductStore from "../store/ProductStore.js";
import {useParams} from "react-router-dom";
import AppProductList from "../components/product/AppProductList.jsx";
import Loader from "../components/layouts/Loader.jsx";

const ProductListByCategoryPage = () => {
    const {CategoryListRequest, CategoryList,BrandListRequest,BrandList, ProductListByCategoryRequest, AllProductList} = ProductStore()
    const {categoryID} = useParams()

    useEffect(() => {
        (async ()=>{
            await CategoryListRequest()
            await BrandListRequest()
            await ProductListByCategoryRequest(categoryID)
        })()
    }, [categoryID]);

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

export default ProductListByCategoryPage;