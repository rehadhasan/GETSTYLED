import React, {useEffect, useState} from 'react';
import Layout from "../components/layouts/Layout.jsx";
import Contact from "../components/layouts/Contact.jsx";
import ProductStore from "../store/ProductStore.js";
import Loader from "../components/layouts/Loader.jsx";

const ContactPage = () => {
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
            <Contact/>
        </Layout>
    );
};

export default ContactPage;