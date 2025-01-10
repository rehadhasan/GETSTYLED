import { create } from 'zustand';
import axios from "axios";
import {Unauthorized} from "../utility/Utility.js";

const URL = '/api/v1';

// Define the store
const WishStore = create((set) => ({
    isWishSubmit: false,

    WishList: null,
    WishCount: 0,
    WishListRequest: async ()=>{
        try{
            let res = await axios.get(`${URL}/WishList`)
            if(res.data['status'] === 'success'){
                set({WishList:res.data['data']})
                set({WishCount:res.data['data'].length})
            }
        }catch (e) {
            Unauthorized(e.response.status)
        }
    },

    SaveWishRequest: async (productID)=>{
        try {
            set({isWishSubmit:true})
            let res = await axios.get(`${URL}/SaveWish/${productID}`)
            if(res.data['status'] === 'success'){
                return true
            }
        }catch (e) {
            Unauthorized(e.response.status)
        }finally {
            set({isWishSubmit:false})
        }
    },

    RemoveWishRequest: async (productID)=>{
        try{
            set({isWishSubmit:true})
            let res = await axios.get(`${URL}/RemoveWish/${productID}`)
            if(res.data['status'] === 'success'){
                return true
            }
        }catch (e) {
            Unauthorized(e.response.status)
        }finally {
            set({isWishSubmit:false})
        }
    },
}));

export default WishStore;
