import React, {useEffect} from 'react';
import Layout from "../components/layouts/Layout.jsx";
import DashboardLayout from "../components/layouts/DashboardLayout.jsx";
import Settings from "../components/users/Settings.jsx";
import ProductStore from "../store/ProductStore.js";
import Loader from "../components/layouts/Loader.jsx";
import UserStore from "../store/UserStore.js";

const SettingsPage = () => {
    const {CategoryListRequest,CategoryList} = ProductStore()
    const {ReadUserRequest, UserDetails} = UserStore()

    useEffect(() => {
        (async ()=>{
            await CategoryListRequest()
            await ReadUserRequest()
        })()
    }, []);

    if(CategoryList === null || UserDetails === null){
        return (
            <Loader/>
        )
    }else{
        return (
            <Layout>
                <DashboardLayout>
                    <Settings/>
                </DashboardLayout>
            </Layout>
        );
    }
};

export default SettingsPage;