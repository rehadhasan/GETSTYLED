import { create } from 'zustand';
import axios from "axios";

const URL = '/api/v1';

// Define the store
const ContactStore = create((set) => ({
    createContactRequest: async (postBody)=>{
        let res = await axios.post(`${URL}/createContact`,postBody)
        if(res.data['status'] === 'success'){
            return true
        }
    },
}));

export default ContactStore;
