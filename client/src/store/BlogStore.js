import { create } from 'zustand';
import axios from "axios";

const URL = '/api/v1';

// Define the store
const BlogStore = create((set) => ({
    BlogList: null,
    BlogListRequest: async ()=>{
        let res = await axios.get(`${URL}/BlogList`)
        if(res.data['status'] === 'success'){
            set({BlogList: res.data['data']})
        }
    },

    DetailsBlog: null,
    DetailsBlogRequest: async (blogID)=>{
        let res = await axios.get(`${URL}/BlogDetails/${blogID}`)
        if(res.data['status'] === 'success'){
            set({DetailsBlog: res.data['data']})
        }
    },
}));

export default BlogStore;
