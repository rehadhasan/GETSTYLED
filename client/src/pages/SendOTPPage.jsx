import React, {useEffect} from 'react';
import OTPForm from "../components/users/SendOTPForm.jsx";
import ProductStore from "../store/ProductStore.js";
import Loader from "../components/layouts/Loader.jsx";
import Layout from "../components/layouts/Layout.jsx";

const SendOTPPage = () => {
    const {BrandListRequest,BrandList,CategoryListRequest,CategoryList} = ProductStore()

    useEffect(() => {
        (async ()=>{
            await CategoryListRequest()
            await BrandListRequest()
        })()
    }, []);

    if(CategoryList === null || BrandList === null){
        return (
            <Loader/>
        )
    }else{
        return (
            <Layout>
                <OTPForm/>
            </Layout>
        );
    }
};

export default SendOTPPage;