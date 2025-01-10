import React, {useEffect} from 'react';
import ProductStore from "../store/ProductStore.js";
import Loader from "../components/layouts/Loader.jsx";
import Layout from "../components/layouts/Layout.jsx";
import PrivacyPolicy from "../components/layouts/PrivacyPolicy.jsx";

const PrivacyPolicyPage = () => {
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
                <PrivacyPolicy/>
            </Layout>
        );
    }
};

export default PrivacyPolicyPage;