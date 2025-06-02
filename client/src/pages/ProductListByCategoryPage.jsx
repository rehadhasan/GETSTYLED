import React, {useEffect} from 'react';
import Layout from "../components/layouts/Layout.jsx";
import ProductStore from "../store/ProductStore.js";
import {useParams} from "react-router-dom";
import Loader from "../components/layouts/Loader.jsx";
import ProductList from "../components/product/ProductList.jsx";

const ProductListByCategoryPage = () => {
    const {CategoryListRequest, CategoryList,BrandListRequest,BrandList, ProductListByCategoryRequest, ListProducts} = ProductStore()
    const {categoryID} = useParams()

    useEffect(() => {
        (async ()=>{
            await CategoryListRequest()
            await BrandListRequest()
            await ProductListByCategoryRequest(categoryID)
        })()
    }, [categoryID]);

    if(CategoryList === null || ListProducts === null || BrandList === null){
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

export default ProductListByCategoryPage;