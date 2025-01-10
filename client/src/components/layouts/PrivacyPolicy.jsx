import React from "react";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
    const policies = [
        {
            title: "Introduction",
            description:
                "We value your privacy and are committed to protecting your personal data. This privacy policy outlines how we collect, use, and safeguard your information.",
        },
        {
            title: "Information We Collect",
            description:
                "We may collect personal information such as your name, email address, billing information, and browsing behavior on our website.",
        },
        {
            title: "How We Use Your Information",
            description:
                "Your information helps us process transactions, provide customer support, and improve your experience on our platform.",
        },
        {
            title: "Sharing Your Information",
            description:
                "We do not sell or share your personal data with third parties, except as required by law or to facilitate our services.",
        },
        {
            title: "Your Rights",
            description:
                "You have the right to access, update, or delete your personal information at any time. Contact us for assistance.",
        },
        {
            title: "Changes to Privacy Policy",
            description:
                "We may update this privacy policy periodically. Any changes will be communicated through our website.",
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
                    Privacy Policy
                </h2>
                <p className="text-center text-black text-opacity-60 mt-2">
                    Your privacy matters to us. Please read our policy carefully.
                </p>

                <div className="mt-8 space-y-6">
                    {policies.map((policy, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="border border-black border-opacity-5 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
                        >
                            <h3 className="text-xl font-semibold text-gray-700">
                                {policy.title}
                            </h3>
                            <p className="text-black text-opacity-60 mt-2">{policy.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default PrivacyPolicy;
