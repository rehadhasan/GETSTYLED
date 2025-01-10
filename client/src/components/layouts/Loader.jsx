import React from "react";

const Loader = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-white">
            <div className="text-center space-y-4">
                {/* DaisyUI Spinner */}
                <div className="flex justify-center">
                    <span className="loading loading-spinner loading-lg text-secondary"></span>
                </div>
                {/* Loader Text */}
                <p className="text-base font-normal text-black text-opacity-30">
                    Loading, please wait...
                </p>
            </div>
        </div>
    );
};

export default Loader;
