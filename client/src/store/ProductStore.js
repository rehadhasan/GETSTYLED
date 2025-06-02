import { create } from 'zustand';
import axios from "axios";

const URL = '/api/v1';

// Define the store
const ProductStore = create((set) => ({
    BrandList: null,
    BrandListRequest: async ()=>{
        let res = await axios.get(`${URL}/BrandList`)
        if(res.data['status'] === 'success'){
            set({BrandList: res.data['data']});
        }
    },

    CategoryList: null,
    CategoryListRequest: async ()=>{
        let res = await axios.get(`${URL}/CategoryList`)
        if(res.data['status'] === 'success'){
            set({CategoryList: res.data['data']});
        }
    },

    AdsList: null,
    AdsListRequest: async ()=>{
        let res = await axios.get(`${URL}/AdsList`)
        if(res.data['status'] === 'success'){
            set({AdsList: res.data['data']});
        }
    },

    ProductSliderList: null,
    ProductSliderListRequest: async ()=>{
        let res = await axios.get(`${URL}/ProductSliderList`)
        if(res.data['status'] === 'success'){
            set({ProductSliderList: res.data['data']});
        }
    },

    ForYouProduct: null,
    ForYouProductRequest: async ()=>{
        let res = await axios.get(`${URL}/ProductList`)
        if(res.data['status'] === 'success'){
            set({ForYouProduct: res.data['data']});
        }
    },

    NewestProductList: null,
    NewestProductListRequest: async ()=>{
        let res = await axios.get(`${URL}/ProductListByRemark/new`)
        if(res.data['status'] === 'success'){
            set({NewestProductList: res.data['data']});
        }
    },

    PopularProductList: null,
    PopularProductListRequest: async ()=>{
        let res = await axios.get(`${URL}/ProductListByRemark/popular`)
        if(res.data['status'] === 'success'){
            set({PopularProductList: res.data['data']});
        }
    },

    ProductDetails: null,
    ProductDetailsRequest: async (productID)=>{
        let res = await axios.get(`${URL}/ProductDetails/${productID}`)
        if(res.data['status'] === 'success'){
            set({ProductDetails: res.data['data']});
        }
    },

    SimilarProductList: null,
    SimilarProductListRequest: async (categoryID)=>{
        let res = await axios.get(`${URL}/ProductListByCategory/${categoryID}`)
        if(res.data['status'] === 'success'){
            set({SimilarProductList: res.data['data']});
        }
    },

    ListProducts: null,
    isLoading: false,
    ProductListByBrandRequest: async (brandID)=>{
        try{
            set({isLoading: true});
            let res = await axios.get(`${URL}/ProductListByBrand/${brandID}`)
            if(res.data['status'] === 'success'){
                set({ListProducts: res.data['data']});
            }
        }finally {
            set({isLoading: false});
        }
    },

    ProductListByCategoryRequest: async (categoryID)=>{
        try{
            set({isLoading: true});
            let res = await axios.get(`${URL}/ProductListByCategory/${categoryID}`)
            if(res.data['status'] === 'success'){
                set({ListProducts: res.data['data']});
            }
        }finally {
            set({isLoading: false});
        }
    },

    ProductListBySearchRequest: async (keyword)=>{
        try{
            set({isLoading: true});
            let res = await axios.get(`${URL}/ProductListByKeyword/${keyword}`)
            if(res.data['status'] === 'success'){
                set({ListProducts: res.data['data']});
            }
        }finally {
            set({isLoading: false});
        }
    },

    ProductListByFilterRequest: async (postBody)=>{
        try{
            set({isLoading: true});
            let res = await axios.post(`${URL}/ProductListByFilter`, postBody)
            if(res.data['status'] === 'success'){
                set({ListProducts: res.data['data']});
                return true
            }
        }finally {
            set({isLoading: false});
        }
    },
}));

export default ProductStore;
