import React, {useEffect} from 'react';
import Layout from "../components/layouts/Layout.jsx";
import DashboardLayout from "../components/layouts/DashboardLayout.jsx";
import Orders from "../components/invoice/Orders.jsx";
import ProductStore from "../store/ProductStore.js";
import Loader from "../components/layouts/Loader.jsx";
import InvoiceStore from "../store/InvoiceStore.js";

const OrdersPage = () => {
    const {CategoryListRequest,CategoryList} = ProductStore()
    const {InvoiceListRequest, InvoiceList} = InvoiceStore()

    useEffect(() => {
        (async ()=>{
            await CategoryListRequest()
            await InvoiceListRequest()
        })()
    }, []);

    if(CategoryList === null || InvoiceList === null){
        return (
            <Loader/>
        )
    }else{
        return (
            <Layout>
                <DashboardLayout>
                    <Orders/>
                </DashboardLayout>
            </Layout>
        );
    }
};

export default OrdersPage;