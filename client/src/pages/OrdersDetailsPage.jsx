import React, {useEffect} from 'react';
import Layout from "../components/layouts/Layout.jsx";
import DashboardLayout from "../components/layouts/DashboardLayout.jsx";
import OrdersDetails from "../components/invoice/OrdersDetails.jsx";
import ProductStore from "../store/ProductStore.js";
import Loader from "../components/layouts/Loader.jsx";
import InvoiceStore from "../store/InvoiceStore.js";
import {useParams} from "react-router-dom";

const OrdersDetailsPage = () => {
    const {CategoryListRequest,CategoryList} = ProductStore()
    const {InvoiceDetailsRequest, InvoiceDetails} = InvoiceStore()
    const {invoiceID} = useParams()

    useEffect(() => {
        (async ()=>{
            await CategoryListRequest()
            await InvoiceDetailsRequest(invoiceID)
        })()
    }, []);

    if(CategoryList === null || InvoiceDetails === null){
        return (
            <Loader/>
        )
    }else{
        return (
            <Layout>
                <DashboardLayout>
                    <OrdersDetails/>
                </DashboardLayout>
            </Layout>
        );
    }
};

export default OrdersDetailsPage;