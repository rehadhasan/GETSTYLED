import { create } from 'zustand';
import axios from "axios";
import Cookies from 'js-cookie';
import {getEmail, getOTP, setEmail, setOTP, Unauthorized} from "../utility/Utility.js";

const URL = '/api/v1';

// Define the store
const UserStore = create((set) => ({
    isLogin:()=>{
        return Cookies.get('token')
    },

    isSubmit: false,

    SaveUserRequest: async (postBody)=>{
        try {
            set({isSubmit:true})
            let res = await axios.post(`${URL}/SaveUser`,postBody)
            if(res.data['status'] === 'success'){
                return true
            }
        }finally {
            set({isSubmit:false})
        }
    },

    LoginData: [],
    LoginUserRequest:async (postBody)=>{
        try{
            set({isSubmit:true})
            let res = await axios.post(`${URL}/LoginUser`, postBody)
            if(res.data['status'] === "success"){
                return true
            }
        }finally {
            set({isSubmit:false})
        }
    },

    LogoutUserRequest: async ()=>{
        try{
            let res = await axios.get(`${URL}/LogoutUser`)
            if(res.data['status'] === 'success'){
                return true
            }
        }catch (e) {
            Unauthorized(e.response.status)
        }
    },

    SendOTPRequest: async (email)=>{
        try{
            set({isSubmit:true})
            setEmail(email);
            let res = await axios.get(`${URL}/SendOTP/${email}`)
            if(res.data['status'] === 'success'){
                return true
            }
        }finally {
            set({isSubmit:false})
        }
    },

    VerifyOTPRequest: async (OTP)=>{
        try{
            set({isSubmit:true})
            let email = getEmail();
            setOTP(OTP);
            let res = await axios.get(`${URL}/VerifyOTP/${email}/${OTP}`)
            if(res.data['status'] === 'success'){
                return true
            }
        }finally {
            set({isSubmit:false})
        }

    },

    ForgetPassRequest: async (password)=>{
        try{
            set({isSubmit:true})
            let email = getEmail();
            let OTP = getOTP();
            let res = await axios.get(`${URL}/ForgetPass/${email}/${OTP}/${password}`)
            if(res.data['status'] === 'success'){
                return true
            }
        }finally {
            set({isSubmit:false})
        }
    },

    UserDetails:null,
    ReadUserRequest: async ()=>{
        try{
            let res = await axios.get(`${URL}/ReadUser`)
            if(res.data['status'] === 'success'){
                set({UserDetails:res.data['data']})
            }
        }catch (e){
            Unauthorized(e.response.status)
        }
    },

    UpdateUserRequest: async (postBody)=>{
        try {
            set({isSubmit:true})
            let res = await axios.post(`${URL}/UpdateUser`,postBody)
            if(res.data['status'] === 'success'){
                return true
            }
        }finally {
            set({isSubmit:false})
        }
    },

    ProfileDetails:null,
    ProfileDetailsRequest: async ()=>{
        try{
            let res = await axios.get(`${URL}/ReadProfile`)
            if(res.data['status'] === 'success'){
                set({ProfileDetails:res.data['data']})
            }
        }catch (e){
            Unauthorized(e.response.status)
        }
    },

    SaveProfileRequest: async (postBody)=>{
        try{
            let res = await axios.post(`${URL}/SaveProfile`, postBody)
            if(res.data['status'] === 'success'){
                return true
            }
        }catch (e){
            Unauthorized(e.response.status)
        }
    },
}));

export default UserStore;
