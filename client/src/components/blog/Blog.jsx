import React from "react";
import { motion } from "framer-motion";
import BlogStore from "../../store/BlogStore.js";

const Blog = () => {
    const {BlogList} = BlogStore()
    return (
        <section className="bg-gray-50 py-10 px-5 md:px-20" id="blog">
            <div className="max-w-7xl mx-auto text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-black text-opacity-80 mb-4">
                    Our Blog
                </h2>
                <p className="text-black text-opacity-60">
                    Stay updated with the latest tips, trends, and insights from our
                    e-commerce store.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {BlogList.map((post, index) => (
                    <motion.div
                        key={post.id}
                        className="bg-white shadow-lg rounded-lg overflow-hidden"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                    >
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-52 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-black text-opacity-80 mb-2">
                                {post.title}
                            </h3>
                            <p className="text-black text-opacity-60 mb-4">{post.content.slice(0,100)}...</p>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-black text-opacity-60">{post.createdAt.slice(0,10)}</span>
                                <a
                                    href={`/blog-details/${post._id}`}
                                    className="text-primary hover:underline text-sm font-medium"
                                >
                                    Read More →
                                </a>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Blog;
