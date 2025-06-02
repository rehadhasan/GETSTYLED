import React, { useEffect, useState } from "react";
import ProductStore from "../../store/ProductStore.js";
import {Link, useNavigate} from "react-router-dom";
import { Fade } from "react-awesome-reveal";

const Brand = () => {
    const { BrandList } = ProductStore();
    const [visibleBrands, setVisibleBrands] = useState(4);
    const navigate = useNavigate();

    useEffect(() => {
        const updateBrandCount = () => {
            if (window.innerWidth >= 1024) {
                setVisibleBrands(4); // Large devices
            } else if (window.innerWidth >= 768) {
                setVisibleBrands(3); // Medium devices
            } else {
                setVisibleBrands(2); // Small devices
            }
        };

        updateBrandCount();
        window.addEventListener("resize", updateBrandCount);

        return () => window.removeEventListener("resize", updateBrandCount);
    }, []);

    // Function to handle brand navigation and scroll to top
    const handleNavigate = (path) => {
        navigate(path);
        window.scrollTo(0, 0);
    };

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 py-10">
                <Fade direction="up" duration={800} triggerOnce>
                    <h2 className="text-black text-opacity-90 lg:text-3xl md:text-2xl text-lg font-bold text-start">
                        Explore Brands
                    </h2>
                </Fade>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 py-4">
                    {BrandList.slice(0, visibleBrands).map((brand) => (
                        <div key={brand.id} className="">
                            <Fade direction="up" duration={800} triggerOnce>
                                <Link
                                    to={`/by-brand/${brand._id}`}
                                    className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4 my-4 flex flex-col items-center w-full"
                                >
                                    <img
                                        src={brand.brandImg}
                                        alt={brand.brandName}
                                        className="w-24 h-24 rounded-md object-cover mb-3"
                                    />
                                    <h3 className="md:text-lg text-sm font-medium text-black text-opacity-700 truncate">
                                        {brand.brandName}
                                    </h3>
                                </Link>
                            </Fade>
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-center mt-4">
                    <Fade direction="up" duration={800} triggerOnce>
                        <button
                            onClick={() => handleNavigate("/brands")}
                            className="text-primary hover:bg-primary hover:text-white px-3 py-2 border border-primary rounded transition ease-in-out duration-300"
                        >
                            Browse Brands
                        </button>
                    </Fade>
                </div>
            </div>
        </div>
    );
};

export default Brand;