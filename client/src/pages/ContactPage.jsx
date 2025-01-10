import React, {useEffect} from 'react';
import Layout from "../components/layouts/Layout.jsx";
import Contact from "../components/layouts/Contact.jsx";
import ProductStore from "../store/ProductStore.js";
import Loader from "../components/layouts/Loader.jsx";

const ContactPage = () => {
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
                <Contact/>
            </Layout>
        );
    }
};

export default ContactPage;