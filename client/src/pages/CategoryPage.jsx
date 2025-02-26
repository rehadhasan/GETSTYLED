import React, {useEffect} from 'react';
import ProductStore from "../store/ProductStore.js";
import Loader from "../components/layouts/Loader.jsx";
import Layout from "../components/layouts/Layout.jsx";
import AppCategories from "../components/category/AppCategories.jsx";

const CategoryPage = () => {
    const {CategoryListRequest, CategoryList} = ProductStore();

    useEffect(() => {
        (async ()=>{
            await CategoryListRequest()
        })()
    }, []);

    if(CategoryList === null){
        return <Loader/>
    }else{
        return (
            <Layout>
                <AppCategories/>
            </Layout>
        );
    }
};

export default CategoryPage;