import React, {useEffect} from 'react';
import Layout from "../components/layouts/Layout.jsx";
import ProductSlider from "../components/product/ProductSlider.jsx";
import Features from "../components/layouts/Features.jsx";
import Category from "../components/category/Category.jsx";
import PopularProduct from "../components/product/PopularProduct.jsx";
import Brand from "../components/brand/Brand.jsx";
import NewProduct from "../components/product/NewProduct.jsx";
import ProductStore from "../store/ProductStore.js";
import FeaturesStore from "../store/FeaturesStore.js";
import Loader from "../components/layouts/Loader.jsx";

const HomePage = () => {
    const {CategoryListRequest, CategoryList, ForYouProductRequest, ForYouProduct, ProductSliderListRequest, ProductSliderList, AdsListRequest, AdsList,PopularProductListRequest,PopularProductList, BrandListRequest, BrandList} = ProductStore()
    const {FeaturesListRequest, FeaturesList} = FeaturesStore()

    useEffect(() => {
        (async ()=>{
            await CategoryListRequest()
            await BrandListRequest()
            await ProductSliderListRequest()
            await AdsListRequest()
            await FeaturesListRequest()
            await PopularProductListRequest()
            await ForYouProductRequest()
        })()
    }, []);

    if(CategoryList === null || BrandList === null || ProductSliderList === null || ForYouProduct === null || AdsList === null || FeaturesList === null || PopularProductList === null){
        return (
            <Loader/>
        )
    }else{
        return (
            <Layout>
                <ProductSlider/>
                <Features/>
                <Category/>
                <PopularProduct/>
                <Brand/>
                <NewProduct/>
            </Layout>
        );
    }
};

export default HomePage;