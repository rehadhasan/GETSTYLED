import React, {useEffect} from 'react';
import ProductStore from "../store/ProductStore.js";
import Layout from "../components/layouts/Layout.jsx";
import Loader from "../components/layouts/Loader.jsx";
import Gallery from "../components/layouts/Gallery.jsx";

const GalleryPage = () => {
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
                <Gallery/>
            </Layout>
        );
    }
};

export default GalleryPage;