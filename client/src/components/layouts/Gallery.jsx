import React from "react";
import { motion } from "framer-motion";

const images = [
    "https://i.ibb.co/n6Hdw1P/istockphoto-1384450465-612x612.jpg",
    "https://i.ibb.co/n6Hdw1P/istockphoto-1384450465-612x612.jpg",
    "https://i.ibb.co/n6Hdw1P/istockphoto-1384450465-612x612.jpg",
    "https://i.ibb.co/n6Hdw1P/istockphoto-1384450465-612x612.jpg",
    "https://i.ibb.co/n6Hdw1P/istockphoto-1384450465-612x612.jpg",
    "https://i.ibb.co/n6Hdw1P/istockphoto-1384450465-612x612.jpg",
];

const Gallery = () => {
    return (
        <section className="bg-white py-10 px-5 md:px-20" id="gallery">
            <div className="max-w-7xl mx-auto text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-black text-opacity-80 mb-4">
                    Our Gallery
                </h2>
                <p className="text-black text-opacity-60">
                    Explore our exclusive collection of high-quality products. Each item
                    is handpicked to meet your needs and style preferences.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {images.map((image, index) => (
                    <motion.div
                        key={index}
                        className="relative overflow-hidden rounded-lg shadow-lg"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                        <motion.img
                            src={image}
                            alt={`Product ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Gallery;
