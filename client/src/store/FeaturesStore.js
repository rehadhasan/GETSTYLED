import { create } from 'zustand';
import axios from "axios";

const URL = '/api/v1';

// Define the store
const FeaturesStore = create((set) => ({
    FeaturesList: null,
    FeaturesListRequest: async ()=>{
        let res = await axios.get(`${URL}/FeaturesList`)
        if(res.data['status'] === 'success'){
            set({FeaturesList: res.data['data']});
        }
    },
}));

export default FeaturesStore;
