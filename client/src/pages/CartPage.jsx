import React, {useEffect} from 'react';
import Layout from "../components/layouts/Layout.jsx";
import ProductStore from "../store/ProductStore.js";
import CartStore from "../store/CartStore.js";
import Loader from "../components/layouts/Loader.jsx";
import AppCartList from "../components/cart/AppCartList.jsx";

const CartPage = () => {
    const {CategoryListRequest, CategoryList} = ProductStore()
    const {CartListRequest, CartList} = CartStore()

    useEffect(() => {
        (async ()=>{
            await CategoryListRequest()
            await CartListRequest()
        })()
    }, []);

    if(CategoryList === null || CartList === null){
        return (
            <Loader/>
        )
    }else{
        return (
            <Layout>
                <AppCartList/>
            </Layout>
        );
    }
};

export default CartPage;