import { create } from 'zustand';
import axios from "axios";
import {Unauthorized} from "../utility/Utility.js";

const URL = '/api/v1';

// Define the store
const CartStore = create((set) => ({
    isCartSubmit: false,

    CartList: null,
    CartCount: 0,
    TotalPrice: 0,
    shippingCharge: 0,
    PayableAmount: 0,
    CartListRequest: async ()=>{
        try {
            const res = await axios.get(`${URL}/CartList`);
            if(res.data['status'] === 'success'){
                const cartItems = res.data['data'];
                const total = cartItems.reduce((sum, item) => {
                    const price = item['product'].discount ? parseFloat(item['product'].discountPrice) : parseFloat(item['product'].price);
                    return sum + (price * parseInt(item.qty));
                }, 0);
                const shippingCharge = 1; // Fixed shipping charge
                const payableAmount = total + shippingCharge;

                set({
                    CartList: cartItems,
                    CartCount: cartItems.length,
                    TotalPrice: total,
                    shippingCharge:shippingCharge,
                    PayableAmount: payableAmount
                });
            }
        }catch (e) {
            Unauthorized(e.response.status)
        }
    },

    SaveCartRequest: async (postBody)=>{
        try {
            set({isCartSubmit:true})
            let res = await axios.post(`${URL}/SaveCart`,postBody)
            if(res.data['status'] === 'success'){
                return true
            }
        }catch (e) {
            Unauthorized(e.response.status)
        }finally {
            set({isCartSubmit:false})
        }
    },

    UpdateCartRequest: async (cartID,postBody)=>{
        try {
            set({isCartSubmit:true})
            let res = await axios.post(`${URL}/UpdateCart/${cartID}`,postBody)
            if(res.data['status'] === 'success'){
                return true
            }
        }catch (e) {
            Unauthorized(e.response.status)
        }finally {
            set({isCartSubmit:false})
        }
    },

    RemoveCartRequest: async (cartID)=>{
        try{
            set({isCartSubmit:true})
            let res = await axios.get(`${URL}/RemoveCart/${cartID}`)
            if(res.data['status'] === 'success'){
                return true
            }
        }catch (e) {
            Unauthorized(e.response.status)
        }
    },
}));

export default CartStore;
