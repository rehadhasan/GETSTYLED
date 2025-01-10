import React, {useEffect} from 'react';
import ProductStore from "../store/ProductStore.js";
import Loader from "../components/layouts/Loader.jsx";
import Layout from "../components/layouts/Layout.jsx";
import BlogDetails from "../components/blog/BlogDetails.jsx";
import BlogStore from "../store/BlogStore.js";
import {useParams} from "react-router-dom";

const BlogDetailsPage = () => {
    const {CategoryListRequest,CategoryList} = ProductStore()
    const {DetailsBlogRequest, DetailsBlog} = BlogStore()

    const {blogID} = useParams()

    useEffect(() => {
        (async ()=>{
            await CategoryListRequest()
            await DetailsBlogRequest(blogID)
        })()
    }, []);

    if(CategoryList === null || DetailsBlog === null){
        return (
            <Loader/>
        )
    }else{
        return (
            <Layout>
                <BlogDetails/>
            </Layout>
        );
    }
};

export default BlogDetailsPage;