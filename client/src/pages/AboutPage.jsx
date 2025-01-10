import React, {useEffect} from 'react';
import Layout from "../components/layouts/Layout.jsx";
import ProductStore from "../store/ProductStore.js";
import Loader from "../components/layouts/Loader.jsx";
import AboutUs from "../components/layouts/AboutUs.jsx";

const AboutPage = () => {
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
                <AboutUs/>
            </Layout>
        );
    }
};

export default AboutPage;