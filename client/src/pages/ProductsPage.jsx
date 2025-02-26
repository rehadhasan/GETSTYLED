import React, {useEffect} from 'react';
import ProductStore from "../store/ProductStore.js";
import Loader from "../components/layouts/Loader.jsx";
import Layout from "../components/layouts/Layout.jsx";
import AppProductList from "../components/product/AppProductList.jsx";

const ProductsPage = () => {
    const {ForYouProductRequest, ForYouProduct, CategoryListRequest, CategoryList} = ProductStore();

    useEffect(() => {
        (async () => {
            await ForYouProductRequest();
            await CategoryListRequest();
        })()
    }, []);

    if(ForYouProduct === null || CategoryList === null) {
        return <Loader/>
    }else{
        return (
            <Layout>
                <AppProductList/>
            </Layout>
        );
    }
};

export default ProductsPage;