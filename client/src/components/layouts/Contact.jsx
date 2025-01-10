import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import ContactStore from "../../store/ContactStore.jsx";
import {toast} from "react-toastify";

const Contact = () => {
    const {createContactRequest} = ContactStore();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log("Form Data:", data);
        let res = await createContactRequest(data)
        if(res){
            toast.success("Thanks for reach out.")
        }else{
            toast.error("Something went wrong")
        }
    };

    return (
        <div className="bg-bg-white-50 py-12 px-6 lg:px-20">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8 lg:p-12"
            >
                <h2 className="text-3xl font-bold text-black text-opacity-80 text-center">
                    Get in Touch
                </h2>
                <p className="text-center text-black text-opacity-60 mt-2">
                    We'd love to hear from you. Fill out the form below or contact us
                    directly.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                    {/* Contact Information */}
                    <div className="space-y-6">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-4"
                        >
                            <FiMail className="text-blue text-2xl" />
                            <div>
                                <p className="text-lg font-semibold text-black text-opacity-70">Email Us</p>
                                <p className="text-black text-opacity-60">engr.rehad@gmail.com</p>
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-4"
                        >
                            <FiPhone className="text-green text-2xl" />
                            <div>
                                <p className="text-lg font-semibold text-black text-opacity-70">Call Us</p>
                                <p className="text-black text-opacity-60">+880 1321774599</p>
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-4"
                        >
                            <FiMapPin className="text-red-500 text-2xl" />
                            <div>
                                <p className="text-lg font-semibold text-black text-opacity-70">Visit Us</p>
                                <p className="text-black text-opacity-60">Pabna, Rajshahi, Bangladesh</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <label className="block text-black text-opacity-70 font-medium mb-2">
                                    Full Name
                                </label>
                                <input
                                    {...register("name", { required: "Name is required" })}
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full border border-black border-opacity-30 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue"
                                />
                                {errors.name && (<span className="text-red-500 text-sm">{errors.name.message}</span>
                                )}
                            </div>

                            <div>
                                <label className="block text-black text-opacity-70 font-medium mb-2">
                                    Email Address
                                </label>
                                <input
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value:
                                                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full border border-black border-opacity-30 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue"
                                />
                                {errors.email && (<span className="text-red-500 text-sm">{errors.email.message}</span>
                                )}
                            </div>

                            <div>
                                <label className="block text-black text-opacity-70 font-medium mb-2">
                                    Subject
                                </label>
                                <input
                                    {...register("subject", { required: "Subject is required" })}
                                    type="text"
                                    placeholder="Enter the subject"
                                    className="w-full border border-black border-opacity-30 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400"
                                />
                                {errors.subject && (<span className="text-red-500 text-sm">{errors.subject.message}</span>
                                )}
                            </div>

                            <div>
                                <label className="block text-black text-opacity-70 font-medium mb-2">
                                    Message
                                </label>
                                <textarea
                                    {...register("message", { required: "Message is required" })}
                                    placeholder="Enter your message"
                                    rows="4"
                                    className="w-full border border-black border-opacity-30 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400"
                                ></textarea>
                                {errors.message && (<span className="text-red-500 text-sm">{errors.message.message}</span>
                                )}
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="w-full bg-primary text-white py-3 rounded-md font-semibold hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                Send Message
                            </motion.button>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;
