import React from "react";
import { motion } from "framer-motion";

const TermsConditions = () => {
    const terms = [
        {
            title: "Acceptance of Terms",
            description:
                "By accessing or using our website, you agree to comply with and be bound by these terms and conditions.",
        },
        {
            title: "Use of Website",
            description:
                "You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of or restrict the use and enjoyment of this site by any third party.",
        },
        {
            title: "Product Descriptions",
            description:
                "We strive to ensure that product descriptions are accurate. However, we do not guarantee that descriptions are error-free.",
        },
        {
            title: "Limitation of Liability",
            description:
                "Our website and services are provided 'as is'. We shall not be liable for any damages arising from the use of our site.",
        },
        {
            title: "Governing Law",
            description:
                "These terms and conditions are governed by the laws of your country and you submit to the exclusive jurisdiction of the courts located there.",
        },
    ];

    return (
        <div className="bg-bg-white py-12 px-6 lg:px-20">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 lg:p-12"
            >
                <h2 className="text-3xl font-bold text-black text-opacity-80 text-center">
                    Terms & Conditions
                </h2>
                <p className="text-center text-black text-opacity-60 mt-2">
                    Please read our terms and conditions carefully before using our website.
                </p>

                <div className="mt-8 space-y-6">
                    {terms.map((term, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="border border-black border-opacity-5 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
                        >
                            <h3 className="text-xl font-semibold text-black text-opacity-70">
                                {term.title}
                            </h3>
                            <p className="text-black text-opacity-60 mt-2">{term.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default TermsConditions;
