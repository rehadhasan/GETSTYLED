import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import UserStore from "../../store/UserStore.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom"; // Eye icons from react-icons

// Validation schema using yup
const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
    phone: yup
        .string()
        .matches(/^\d{11}$/, "Phone number must be 11 digits")
        .required("Phone number is required"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
});

const SignupForm = () => {
    const {SaveUserRequest,isSubmit} = UserStore()
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const onSubmit = async (data) => {
        let res = await SaveUserRequest(data);
        if (res) {
            toast.success("Account Created Successfully");
            setShowModal(true); // Show modal on success
        } else {
            toast.error("Something Went Wrong!");
        }
    };

    const handleModalClose = () => {
        setShowModal(false); // Hide the modal
        navigate("/login"); // Redirect to /login
    };

    return (
        <section className='bg-white py-8'>
            <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-black text-opacity-90 text-2xl font-semibold text-center mb-6">Sign Up</h2>
                <div>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-black text-opacity-80">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            {...register("name")}
                            className="mt-1 block w-full px-3 py-2 bg-white text-black border border-black border-opacity-10 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                        />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-black text-opacity-80">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder='example@gmail.com'
                            {...register("email")}
                            className="mt-1 block w-full px-3 py-2 bg-white text-black border border-black border-opacity-10 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-sm font-medium text-black text-opacity-80">
                            Phone
                        </label>
                        <input
                            id="phone"
                            type="text"
                            {...register("phone")}
                            className="mt-1 block w-full px-3 py-2 bg-white text-black border border-black border-opacity-10 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                        />
                        {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                    </div>

                    <div className="mb-4 relative">
                        <label htmlFor="password" className="block text-sm font-medium text-black text-opacity-80">
                            Password
                        </label>
                        <input
                            id="password"
                            type={passwordVisible ? "text" : "password"}
                            {...register("password")}
                            className="mt-1 block w-full px-3 py-2 bg-white text-black border border-black border-opacity-10 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black pr-10" // Added pr-10 for right padding
                        />
                        <span
                            className="absolute top-1/2 right-3 transform translate-y-1/3 cursor-pointer"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                        {passwordVisible ? <AiOutlineEye/> : <AiOutlineEyeInvisible/>}
                    </span>
                        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                    </div>

                    <div className="mb-4 relative">
                        <label htmlFor="confirmPassword"
                               className="block text-sm font-medium text-black text-opacity-80">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type={confirmPasswordVisible ? "text" : "password"}
                            {...register("confirmPassword")}
                            className="mt-1 block w-full px-3 py-2 bg-white text-black border border-black border-opacity-10 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black pr-10" // Added pr-10 for right padding
                        />
                        <span className="absolute top-1/2 right-3 transform translate-y-1/3 cursor-pointer"
                              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                        >
                        {confirmPasswordVisible ? <AiOutlineEye/> : <AiOutlineEyeInvisible/>}
                    </span>
                        {errors.confirmPassword &&
                            <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
                    </div>

                    {
                        !isSubmit ? (
                            <button
                                type="submit"
                                onClick={handleSubmit(onSubmit)}
                                className="w-full py-2 px-4 bg-secondary text-white font-semibold rounded-md hover:bg-secondary focus:outline-none"
                            >
                                Sign Up
                            </button>
                        ) : (
                            <button
                                className='flex items-center justify-center gap-3 w-full py-2 px-4 bg-secondary text-white font-semibold rounded-md hover:bg-secondary focus:outline-none'>
                                <span>Loading</span>
                                <span className="loading loading-spinner loading-sm"></span>
                            </button>
                        )
                    }
                </div>
                <div>
                    {/* Modal */}
                    {showModal && (
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white p-6 rounded shadow">
                                <h2 className="text-lg font-bold mb-4">Success</h2>
                                <p>Your account has been created successfully!</p>
                                <button
                                    className="mt-4 bg-secondary text-white py-2 px-4 rounded"
                                    onClick={handleModalClose}
                                >
                                    Go to Login
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default SignupForm;
