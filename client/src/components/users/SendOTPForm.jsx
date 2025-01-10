import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useNavigate} from "react-router-dom";
import UserStore from "../../store/UserStore.js";
import {toast} from "react-toastify";

// Validation schema using yup
const schema = yup.object().shape({
    email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
});

const SendOTPForm = () => {
    const {SendOTPRequest,isSubmit} = UserStore();
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        let res = await SendOTPRequest(data.email)
        if(res){
            navigate('/verify-otp')
            toast.success('OTP Send Successfully')
        }{
            toast.error("Wrong Email Address !")
        }
    };

    return (
        <div className="flex justify-center items-center px-4 py-8 bg-white">
            <div className="max-w-sm w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-black text-opacity-90 text-2xl font-semibold text-center mb-6">Send OTP</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Email input */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-black">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...register("email")}
                            placeholder='example@gmail.com'
                            className="mt-1 block w-full px-3 py-2 bg-white text-black border border-black border-opacity-5 focus:border-black rounded-md shadow-sm focus:outline-none"
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>

                    {/* Submit Button */}
                    {
                        !isSubmit?(
                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-secondary text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
                            >
                                Send OTP
                            </button>
                        ): (
                            <button
                                className='flex items-center justify-center gap-3 w-full py-2 px-4 bg-secondary text-white font-semibold rounded-md hover:bg-secondary focus:outline-none'>
                                <span>Loading</span>
                                <span className="loading loading-spinner loading-sm"></span>
                            </button>
                        )
                    }
                </form>
            </div>
        </div>
    );
};

export default SendOTPForm;
