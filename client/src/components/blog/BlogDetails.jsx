import React from "react";
import { motion } from "framer-motion";
import BlogStore from "../../store/BlogStore.js";

const BlogDetails = () => {
    const {DetailsBlog} = BlogStore()
    return (
        <section className="bg-bg-white py-10 px-5 md:px-20">
            <motion.div
                className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div className='w-full h-64 md:h-96 overflow-hidden'>
                    <img
                        src={DetailsBlog.image}
                        alt={DetailsBlog.title}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="p-6 md:p-10">
                    <motion.h1
                        className="text-3xl md:text-4xl font-bold text-black text-opacity-80 mb-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {DetailsBlog.title}
                    </motion.h1>
                    <motion.p
                        className="text-sm text-black text-opacity-50 mb-6"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {DetailsBlog.createdAt.slice(0,10)}
                    </motion.p>
                    <motion.div
                        className="text-black text-opacity-70 leading-relaxed text-lg space-y-6"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 0.8, delay: 0.3}}
                    >
                        <p>{DetailsBlog.content}</p>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default BlogDetails;
