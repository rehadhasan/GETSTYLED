import React, { useEffect, useState } from 'react';
import Layout from "../components/layouts/Layout.jsx";
import ProductStore from "../store/ProductStore.js";
import Loader from "../components/layouts/Loader.jsx";
import AboutUs from "../components/layouts/AboutUs.jsx";

const AboutPage = () => {
    const { CategoryListRequest, CategoryList } = ProductStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async ()=>{
            await new Promise(resolve => setTimeout(resolve, 300));
            await CategoryListRequest();
            setIsLoading(false);
        })()
    }, []);

    if (isLoading || CategoryList === null) {
        return <Loader />;
    }

    return (
        <Layout>
            <AboutUs />
        </Layout>
    );
};

export default AboutPage;