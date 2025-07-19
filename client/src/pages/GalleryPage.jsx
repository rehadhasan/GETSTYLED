import React, {useEffect, useState} from 'react';
import ProductStore from "../store/ProductStore.js";
import Layout from "../components/layouts/Layout.jsx";
import Loader from "../components/layouts/Loader.jsx";
import Gallery from "../components/layouts/Gallery.jsx";

const GalleryPage = () => {
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
            <Gallery/>
        </Layout>
    );
};

export default GalleryPage;