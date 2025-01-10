import React, {useEffect} from 'react';
import ProductStore from "../store/ProductStore.js";
import Loader from "../components/layouts/Loader.jsx";
import Layout from "../components/layouts/Layout.jsx";
import Career from "../components/layouts/Career.jsx";

const CareerPage = () => {
    const {CategoryListRequest,CategoryList} = ProductStore()

    useEffect(() => {
        (async ()=>{
            await CategoryListRequest()
        })()
    }, []);

    if(CategoryList === null){
        return (
            <Loader/>
        )
    }else{
        return (
            <Layout>
                <Career/>
            </Layout>
        );
    }
};

export default CareerPage;