import React, {useEffect} from 'react';
import ResetPasswordForm from "../components/users/ResetPasswordForm.jsx";
import ProductStore from "../store/ProductStore.js";
import Loader from "../components/layouts/Loader.jsx";
import Layout from "../components/layouts/Layout.jsx";

const ResetPasswordPage = () => {
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
                <ResetPasswordForm/>
            </Layout>
        );
    }
};

export default ResetPasswordPage;