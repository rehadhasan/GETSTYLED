import React from "react";
import { motion } from "framer-motion";

const careerOpportunities = [
    {
        title: "Product Designer",
        location: "New York, NY",
        description:
            "Join our creative team to design the next big thing in the e-commerce space. You will work closely with product and engineering teams to build intuitive and impactful designs.",
        requirements: [
            "Experience with Figma and Adobe Creative Suite.",
            "Strong UX/UI design skills.",
            "Collaborative attitude and problem-solving mindset.",
        ],
    },
    {
        title: "Marketing Manager",
        location: "Remote",
        description:
            "Lead our marketing initiatives to expand our customer base. This role involves creating strategies, running campaigns, and analyzing data to optimize marketing efforts.",
        requirements: [
            "Experience in digital marketing and social media.",
            "Strong analytical and communication skills.",
            "Experience in e-commerce marketing is a plus.",
        ],
    },
    {
        title: "Software Engineer",
        location: "San Francisco, CA",
        description:
            "Join our engineering team to build high-quality, scalable software solutions for our e-commerce platform. Collaborate with cross-functional teams to ensure seamless user experiences.",
        requirements: [
            "Proficiency in JavaScript and Node.js.",
            "Experience with React and modern front-end frameworks.",
            "Strong problem-solving skills and a passion for coding.",
        ],
    },
];

const Career = () => {
    return (
        <section className="bg-bg-white py-10 px-5 md:px-20" id="career">
            <div className="max-w-7xl mx-auto text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-black text-opacity-80 mb-4">
                    Careers
                </h2>
                <p className="text-black text-opacity-60">
                    We are always looking for talented and passionate individuals to join our team. Check out our open positions below and apply today!
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {careerOpportunities.map((job, index) => (
                    <motion.div
                        key={index}
                        className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <h3 className="text-2xl font-semibold text-black text-opacity-80 mb-2">
                            {job.title}
                        </h3>
                        <p className="text-black text-opacity-50 mb-4">{job.location}</p>
                        <p className="text-black text-opacity-70 mb-4">{job.description}</p>
                        <h4 className="text-lg font-semibold text-black text-opacity-80 mb-2">Requirements</h4>
                        <ul className="list-disc list-inside text-black text-opacity-70 space-y-2">
                            {job.requirements.map((req, idx) => (
                                <li key={idx}>{req}</li>
                            ))}
                        </ul>
                        <motion.button
                            className="mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition-colors duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.location.href = '/contact'}
                        >
                            Apply Now
                        </motion.button>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Career;