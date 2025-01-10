import React, {useEffect} from 'react';
import VerifyOTPForm from "../components/users/VerifyOTPForm.jsx";
import ProductStore from "../store/ProductStore.js";
import Loader from "../components/layouts/Loader.jsx";
import Layout from "../components/layouts/Layout.jsx";

const OTPVerifyPage = () => {
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
                <VerifyOTPForm/>
            </Layout>
        );
    }
};

export default OTPVerifyPage;