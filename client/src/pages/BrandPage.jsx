import React, {useEffect} from 'react';
import ProductStore from "../store/ProductStore.js";
import Loader from "../components/layouts/Loader.jsx";
import AppBrands from "../components/brand/AppBrands.jsx";
import Layout from "../components/layouts/Layout.jsx";

const BrandPage = () => {
    const {BrandListRequest, BrandList, CategoryListRequest, CategoryList} = ProductStore();

    useEffect(() => {
        (async ()=>{
            await BrandListRequest();
            await CategoryListRequest()
        })()
    }, []);

    if(BrandList === null || CategoryList === null){
        return <Loader/>
    }

    return (
        <Layout>
            <AppBrands/>
        </Layout>
    );
};

export default BrandPage;