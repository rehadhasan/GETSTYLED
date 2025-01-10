import React, {useEffect} from 'react';
import ProductStore from "../store/ProductStore.js";
import Loader from "../components/layouts/Loader.jsx";
import Layout from "../components/layouts/Layout.jsx";
import Blog from "../components/blog/Blog.jsx";
import BlogStore from "../store/BlogStore.js";

const BlogPage = () => {
    const {CategoryListRequest,CategoryList} = ProductStore()
    const {BlogListRequest, BlogList} = BlogStore()

    useEffect(() => {
        (async ()=>{
            await CategoryListRequest()
            await BlogListRequest()
        })()
    }, []);

    if(CategoryList === null || BlogList === null){
        return (
            <Loader/>
        )
    }else{
        return (
            <Layout>
                <Blog/>
            </Layout>
        );
    }
};

export default BlogPage;