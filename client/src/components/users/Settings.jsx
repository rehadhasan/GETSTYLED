import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import UserStore from "../../store/UserStore.js";
import {toast} from "react-toastify";

const Settings = () => {
    const { UserDetails, UpdateUserRequest, ReadUserRequest } = UserStore();

    // Form handling with react-hook-form
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        mode: "onChange", // Enable validation on every change
    });

    // Initial state for profile photo and generated number
    const [photo, setPhoto] = useState(UserDetails?.photo || ""); // Use default photo URL if available
    const [base64Photo, setBase64Photo] = useState(""); // Store the Base64 string

    // Password visibility state
    const [showPassword, setShowPassword] = useState(false);  // State to toggle password visibility

    // Track initial values for comparison (no condition for update button)
    const [initialValues, setInitialValues] = useState({
        name: UserDetails?.name,
        email: UserDetails?.email,
        phone: UserDetails?.phone,
        password: UserDetails?.password,
        photo: UserDetails?.photo,
    });

    // Pre-populate the form with UserDetails data
    useEffect(() => {
        if (UserDetails) {
            setValue("name", UserDetails.name);
            setValue("email", UserDetails.email);
            setValue("phone", UserDetails.phone);
            setValue("password", UserDetails.password);
        }
    }, [UserDetails, setValue]);

    // Submit handler
    const onSubmit = async (data) => {
        const postBody = { ...data, photo: base64Photo };
        let res = await UpdateUserRequest(postBody)
        if(res){
            toast.success("Saved Changes Successfully");
            await ReadUserRequest()
        }else{
            toast.error("Something went wrong")
        }
    };

    // Handle photo change (convert to Base64)
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Convert the image to Base64
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setPhoto(URL.createObjectURL(file));
                setBase64Photo(reader.result); // Store Base64 string
            };
        }
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);  // Toggle between true and false
    };

    return (
        <div className="container mx-auto p-6">
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-black text-opacity-90">Settings</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                    {/* Profile Photo */}
                    <div className="flex md:flex-row flex-col items-center justify-center gap-5">
                        <div className="w-20 h-20 bg-gray-200 rounded-full flex justify-center items-center">
                            {photo ? (
                                <img src={photo} alt="Profile" className="w-full h-full object-cover rounded-full"/>
                            ) : (
                                <FiUser className="text-4xl text-gray-500"/>
                            )}
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            className="p-2 border focus:border-black bg-white text-black rounded-md outline-none focus:outline-none"
                            onChange={handlePhotoChange}
                        />
                    </div>

                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your full name"
                            className="mt-2 p-3 w-full border focus:border-black bg-white text-black rounded-md outline-none focus:outline-none"
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={UserDetails?.email || ""} // Ensure the email is pre-filled and cannot be changed
                            readOnly
                            disabled
                            placeholder="Enter your email"
                            className="mt-2 p-3 w-full border focus:border-black bg-white text-black rounded-md outline-none focus:outline-none"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-600">Phone</label>
                        <input
                            type="tel"
                            id="phone"
                            placeholder="Enter your phone number"
                            className="mt-2 p-3 w-full border focus:border-black bg-white text-black rounded-md outline-none focus:outline-none"
                            {...register("phone", { required: "Phone number is required" })}
                        />
                        {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>}
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}  // Toggle the input type based on the state
                            id="password"
                            placeholder="Enter your password"
                            className="mt-2 p-3 w-full border focus:border-black bg-white text-black rounded-md outline-none focus:outline-none"
                            {...register("password", { required: "Password is required" })}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 transform translate-y-1/4 text-black text-opacity-60"
                        >
                            {showPassword ? <FiEyeOff size={20}/> : <FiEye size={20}/>} {/* Toggle icon */}
                        </button>
                        {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-primary cursor-pointer text-white hover:bg-primary-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Settings;
