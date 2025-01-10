import React, {useEffect} from 'react';
import Layout from "../components/layouts/Layout.jsx";
import ProductStore from "../store/ProductStore.js";
import WishStore from "../store/WishStore.js";
import Loader from "../components/layouts/Loader.jsx";
import AppWishList from "../components/wish/AppWishList.jsx";

const WishPage = () => {
    const {CategoryListRequest, CategoryList} = ProductStore()
    const {WishListRequest, WishList} = WishStore()

    useEffect(() => {
        (async ()=>{
            await CategoryListRequest()
            await WishListRequest()
        })()
    }, []);

    if(CategoryList === null || WishList === null){
        return (
            <Loader/>
        )
    }else{
        return (
            <Layout>
                <AppWishList/>
            </Layout>
        );
    }
};

export default WishPage;