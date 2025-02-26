import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import {Link, useNavigate} from "react-router-dom";
import UserStore from "../../store/UserStore.js";
import {toast} from "react-toastify";

// Validation schema using yup
const schema = yup.object().shape({
    email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
    password: yup
        .string()
        .min(5, "Password must be at least 5 characters")
        .required("Password is required"),
});

const LoginForm = () => {
    const {LoginUserRequest, isSubmit, LoginData} = UserStore()
    console.log(LoginData)
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [passwordVisible, setPasswordVisible] = useState(false);

    const onSubmit = async (data) => {
        let res = await LoginUserRequest(data)
        if(res){
            navigate('/')
            toast.success("Login Successfully")
        }else{
            toast.error("Login Failed !")
        }
    };

    return (
        <div className="flex justify-center items-center px-4 py-8 bg-white">
            <div className="max-w-sm w-full bg-white p-8 rounded-lg shadow-lg border border-black border-opacity-5">
                <h2 className="text-black text-opacity-90 text-2xl font-semibold text-center mb-6">Login</h2>

                <div>
                    {/* Email input */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder='example@gmail.com'
                            {...register("email")}
                            className="mt-1 block w-full px-3 py-2 bg-white text-black border border-black border-opacity-10 rounded-md shadow-sm focus:border-black focus:outline-none"
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>

                    {/* Password input */}
                    <div className="mb-4 relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            type={passwordVisible ? "text" : "password"}
                            {...register("password")}
                            className="mt-1 block w-full px-3 py-2 bg-white text-black border border-black border-opacity-10 rounded-md shadow-sm focus:outline-none focus:border-black pr-10"
                        />
                        <span className="absolute top-1/2 right-3 transform translate-y-1/3 cursor-pointer"
                              onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                        {passwordVisible ? <AiOutlineEye/> : <AiOutlineEyeInvisible/>}
                    </span>
                        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                    </div>

                    {/* Submit Button */}
                    {
                        !isSubmit?(
                            <button
                                type="submit"
                                onClick={handleSubmit(onSubmit)}
                                className="w-full py-2 px-4 bg-secondary text-white font-semibold rounded-md hover:bg-secondary focus:outline-none"
                            >
                                Login
                            </button>
                        ): (
                            <button
                                className='flex items-center justify-center gap-3 w-full py-2 px-4 bg-secondary text-white font-semibold rounded-md hover:bg-secondary focus:outline-none'>
                                <span>Loading</span>
                                <span className="loading loading-spinner loading-sm"></span>
                            </button>
                        )
                    }
                    <div className='flex items-center justify-center mt-5'>
                        <Link className='text-sm font-semibold text-black' to='/otp'>Forgot Password</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
