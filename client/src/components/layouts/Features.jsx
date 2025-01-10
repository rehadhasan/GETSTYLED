// Features.js
import React from "react";
import { Fade } from "react-awesome-reveal";
import FeaturesStore from "../../store/FeaturesStore.js";

const Features = () => {
    const {FeaturesList} = FeaturesStore()
    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-wrap justify-center items-center gap-6 bg-white rounded-lg shadow-xl p-6 border border-gray-100">
                    {FeaturesList.map((feature, index) => {
                        return (
                            <Fade key={index} cascade direction="up" duration={800} triggerOnce>
                                <div className="flex items-center gap-4 p-4 w-64 bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
                                    <div className='w-16'>
                                        <img src={feature.icon} alt={feature.title} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-black text-opacity-80">{feature.title}</h3>
                                        <p className="text-black text-opacity-60">{feature.shortDes}</p>
                                    </div>
                                </div>
                            </Fade>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Features;
