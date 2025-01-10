import { create } from 'zustand';
import axios from "axios";
import {Unauthorized} from "../utility/Utility.js";

const URL = '/api/v1';

// Define the store
const ReviewStore = create((set) => ({
    SaveReviewRequest: async (postBody)=>{
        try{
            let res = await axios.post(`${URL}/SaveReview`,postBody)
            if(res.data['status'] === 'success'){
                return true
            }
        }catch (e) {
            Unauthorized(e.response.status)
        }
    },

    ReviewList: null,
    ReviewListRequest: async (productID)=>{
        let res = await axios.get(`${URL}/ReviewList/${productID}`)
        if(res.data['status'] === 'success'){
            set({ReviewList: res.data['data']});
        }
    },
}));

export default ReviewStore;
