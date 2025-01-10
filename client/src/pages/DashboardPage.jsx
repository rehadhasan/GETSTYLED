import React, {useEffect} from 'react';
import Layout from "../components/layouts/Layout.jsx";
import ProductStore from "../store/ProductStore.js";
import Loader from "../components/layouts/Loader.jsx";
import Dashboard from "../components/users/Dashboard.jsx";
import DashboardLayout from "../components/layouts/DashboardLayout.jsx";
import UserStore from "../store/UserStore.js";
import InvoiceStore from "../store/InvoiceStore.js";
import WishStore from "../store/WishStore.js";

const DashboardPage = () => {
    const {CategoryListRequest,CategoryList} = ProductStore()
    const {ReadUserRequest, UserDetails} = UserStore()
    const {InvoiceListRequest, InvoiceList} = InvoiceStore()
    const {WishListRequest, WishList} = WishStore()

    useEffect(() => {
        (async ()=>{
            await CategoryListRequest()
            await ReadUserRequest()
            await InvoiceListRequest()
            await WishListRequest()
        })()
    }, []);

    if(CategoryList === null || UserDetails === null || InvoiceList === null || WishList === null){{
        return (
            <Loader/>
        )
    }}else{
        return (
            <Layout>
                <DashboardLayout>
                    <Dashboard/>
                </DashboardLayout>
            </Layout>
        );
    }
};

export default DashboardPage;