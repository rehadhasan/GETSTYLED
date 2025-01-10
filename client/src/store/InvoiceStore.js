import { create } from 'zustand';
import axios from "axios";
import {Unauthorized} from "../utility/Utility.js";

const URL = '/api/v1';

// Define the store
const InvoiceStore = create((set) => ({
    invoiceIsSubmit: false,
    CreateInvoiceRequest: async ()=>{
        try{
            set({invoiceIsSubmit:true})
            let res = await axios.post(`${URL}/CreateInvoice`)
            if(res.data['status'] === 'success'){
                window.location.href = res.data['data']['GatewayPageURL']
            }
        }catch (e) {
            Unauthorized(e.response.status)
        }finally {
            set({invoiceIsSubmit:false})
        }
    },

    InvoiceList: null,
    InvoiceListRequest: async ()=>{
        try{
            let res = await axios.get(`${URL}/InvoiceList`)
            if(res.data['status'] === 'success'){
                set({InvoiceList:res.data['data']})
            }
        }catch (e) {
            Unauthorized(e.response.status)
        }
    },

    InvoiceDetails: null,
    InvoiceDetailsRequest: async (invoiceID)=>{
        try{
            let res = await axios.get(`${URL}/InvoiceDetails/${invoiceID}`)
            if(res.data['status'] === 'success'){
                set({InvoiceDetails:res.data['data']})
            }
        }catch (e) {
            Unauthorized(e.response.status)
        }
    },
}));

export default InvoiceStore;
