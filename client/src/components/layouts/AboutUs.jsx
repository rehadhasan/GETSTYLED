import React from "react";
import { motion } from "framer-motion";
import aboutImg from "../../assets/img/about_us.jpg"

const AboutUs = () => {
    return (
        <section className="bg-bg-white py-10 px-5 md:px-20" id="about-us">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
                {/* Left Section: Image */}
                <motion.div
                    className="w-full md:w-1/2"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <img src={aboutImg} alt="About Us" className="rounded-lg shadow-lg w-full"/>
                </motion.div>

                {/* Right Section: Content */}
                <motion.div
                    className="w-full md:w-1/2 text-center md:text-left"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-black text-opacity-80 mb-5">
                        About Our Store
                    </h2>
                    <p className="text-black text-opacity-60 mb-6">
                        Welcome to our e-commerce store! We offer a wide range of high-quality
                        products tailored to meet your needs. Our mission is to provide a seamless
                        shopping experience with top-notch customer service.
                    </p>
                    <p className="text-black text-opacity-60 mb-6">
                        From exclusive collections to everyday essentials, we strive to deliver
                        excellence in everything we do. Shop with confidence and enjoy fast,
                        reliable shipping and hassle-free returns.
                    </p>
                    <motion.a
                        href="/"
                        className="bg-primary text-white px-6 py-3 rounded-lg shadow hover:bg-secondary transition duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Shop Now
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutUs;
