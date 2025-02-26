import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import UserStore from "../../store/UserStore.js";
import {toast} from "react-toastify";

const ResetPasswordForm = () => {
    const {ForgetPassRequest, isSubmit} = UserStore();
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const onSubmit = async (data) => {
        let res = await ForgetPassRequest(data.password)
        if(res){
            navigate('/login')
            toast.success('Password Forgot Successfully')
        }else{
            toast.error('Something Went Wrong !')
        }
    };

    return (
        <div className='px-4 py-8 bg-white'>
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border border-black border-opacity-5">
                <h2 className="text-2xl font-semibold text-center text-black text-opacity-90 mb-6">Reset Your Password</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-black">Password</label>
                        <div className="relative">
                            <input
                                id="password"
                                type={isPasswordVisible ? 'text' : 'password'}
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {value: 5, message: 'Password must be at least 5 characters long'}
                                })}
                                className={`mt-2 p-3 w-full bg-white text-black border focus:outline-none focus:border-black ${errors.password ? 'border-red-500' : 'border-black border-opacity-5'} rounded-md`}
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/3 text-gray-600"
                                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                            >
                                {isPasswordVisible ? (
                                    <AiOutlineEye className="w-5 h-5 text-gray-600" />
                                ) : (
                                    <AiOutlineEyeInvisible className="w-5 h-5 text-gray-600" />
                                )}
                            </button>
                        </div>
                        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                    </div>

                    {/* Confirm Password Input */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-black">Confirm
                            Password</label>
                        <div className="relative">
                            <input
                                id="confirmPassword"
                                type={isConfirmPasswordVisible ? 'text' : 'password'}
                                {...register('confirmPassword', {
                                    required: 'Confirm Password is required',
                                    validate: value => value === watch('password') || 'Passwords do not match'
                                })}
                                className={`mt-2 p-3 w-full bg-white text-black border focus:outline-none focus:border-black ${errors.confirmPassword ? 'border-red-500' : 'border-black border-opacity-5'} rounded-md`}
                                placeholder="Confirm your password"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/3 text-gray-600"
                                onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                            >
                                {isConfirmPasswordVisible ? (
                                    <AiOutlineEye className="w-5 h-5 text-gray-600" />
                                ) : (
                                    <AiOutlineEyeInvisible className="w-5 h-5 text-gray-600" />
                                )}
                            </button>
                        </div>
                        {errors.confirmPassword &&
                            <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
                    </div>

                    {/* Submit Button */}
                    {
                        !isSubmit?(
                            <button
                                type="submit"
                                className="w-full py-3 bg-secondary text-white font-semibold rounded-md hover:bg-secondary transition duration-200"
                            >
                                Reset Password
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

export default ResetPasswordForm;
