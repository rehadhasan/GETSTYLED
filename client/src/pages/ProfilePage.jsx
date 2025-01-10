import React, {useEffect} from 'react';
import Layout from "../components/layouts/Layout.jsx";
import DashboardLayout from "../components/layouts/DashboardLayout.jsx";
import Profile from "../components/users/Profile.jsx";
import ProductStore from "../store/ProductStore.js";
import Loader from "../components/layouts/Loader.jsx";
import UserStore from "../store/UserStore.js";

const ProfilePage = () => {
    const {CategoryListRequest,CategoryList} = ProductStore()
    const {ProfileDetailsRequest} = UserStore()

    useEffect(() => {
        (async ()=>{
            await ProfileDetailsRequest()
            await CategoryListRequest()
        })()
    }, []);

    if(CategoryList === null){
        return (
            <Loader/>
        )
    }else{
        return (
            <Layout>
                <DashboardLayout>
                    <Profile/>
                </DashboardLayout>
            </Layout>
        );
    }
};

export default ProfilePage;