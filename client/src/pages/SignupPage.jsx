import React, {useEffect} from 'react';
import SignupForm from "../components/users/SignupForm.jsx";
import Layout from "../components/layouts/Layout.jsx";
import ProductStore from "../store/ProductStore.js";
import Loader from "../components/layouts/Loader.jsx";

const SignupPage = () => {
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
                <SignupForm/>
            </Layout>
        );
    }
};

export default SignupPage;