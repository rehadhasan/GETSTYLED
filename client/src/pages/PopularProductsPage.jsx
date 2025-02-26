import React, {useEffect} from 'react';
import ProductStore from "../store/ProductStore.js";
import Loader from "../components/layouts/Loader.jsx";
import Layout from "../components/layouts/Layout.jsx";
import AppPopularProductList from "../components/product/AppPopularProductList.jsx";

const PopularProductsPage = () => {
    const {PopularProductListRequest, PopularProductList, CategoryListRequest, CategoryList} = ProductStore();

    useEffect(() => {
        (async () => {
            await PopularProductListRequest();
            await CategoryListRequest();
        })()
    }, []);

    if(PopularProductList === null || CategoryList === null) {
        return <Loader/>
    }else{
        return (
            <Layout>
                <AppPopularProductList/>
            </Layout>
        );
    }
};

export default PopularProductsPage;