import React, {useEffect, useState} from 'react';
import ProductStore from "../store/ProductStore.js";
import Loader from "../components/layouts/Loader.jsx";
import Layout from "../components/layouts/Layout.jsx";
import Career from "../components/layouts/Career.jsx";

const CareerPage = () => {
    const {CategoryListRequest,CategoryList} = ProductStore();
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
            <Career/>
        </Layout>
    );
};

export default CareerPage;