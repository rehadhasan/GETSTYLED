import React, {useEffect} from 'react';
import LoginForm from "../components/users/LoginForm.jsx";
import ProductStore from "../store/ProductStore.js";
import Loader from "../components/layouts/Loader.jsx";
import Layout from "../components/layouts/Layout.jsx";

const LoginPage = () => {
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
                <LoginForm/>
            </Layout>
        );
    }
};

export default LoginPage;