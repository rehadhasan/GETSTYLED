import React, {useEffect, useState} from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import { useMediaQuery } from "react-responsive";
import Select from "react-select";
import { CiHeart } from "react-icons/ci";
import { RiShoppingBag4Line } from "react-icons/ri";
import ProductStore from "../../store/ProductStore.js";
import {Link, useNavigate} from "react-router-dom";
import UserStore from "../../store/UserStore.js";
import {toast, ToastContainer} from "react-toastify";
import CartStore from "../../store/CartStore.js";
import WishStore from "../../store/WishStore.js";

const navMenu = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "Blogs", path: "/blog" },
    { name: "Career", path: "/career" },
    { name: "Contact", path: "/contact" },
];

const AppNavbar = () => {
    const {isLogin,LogoutUserRequest} = UserStore()
    const {CartCount, CartListRequest} = CartStore();
    const {WishCount, WishListRequest} = WishStore();
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate(); // Hook for navigation
    const {CategoryList } = ProductStore()
    const [keyword, setKeyword] = useState('')

    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    const categoryOptions = CategoryList.map((category) => ({
        value: category._id, // Use _id as the value for dynamic routing
        label: category.categoryName,
    }));

    const handleCategoryChange = (selectedOption) => {
        if (selectedOption) {
            const selectedCategoryId = selectedOption.value; // Get the _id from the selected option
            navigate(`/by-category/${selectedCategoryId}`); // Dynamic route with _id
        }
    };

    const handleLogout = async () => {
        let res = await LogoutUserRequest()
        if(res){
            toast.success("Logout Successfully")
            setShowModal(false); // Close modal after logout
            setMenuOpen(false)
            navigate('/')
        }else{
            toast.error("Logout Failed !")
            setShowModal(false); // Close modal after logout
        }
    };

    useEffect(() => {
        (async ()=>{
            if(isLogin()){
                await CartListRequest()
                await WishListRequest()
            }
        })()
    }, []);

    return (
        <div className="border-b-2 z-50 bg-bg-white">
            {/* Top bar */}
            <div className="bg-bg-primary">
                <div className="container mx-auto flex justify-between items-center text-white px-4 py-3 text-xs sm:text-sm">
                    <div className="flex md:flex-row flex-col md:gap-3 gap-1 text-sm">
                        <a href="#">Contact: support@getstyled.com</a>
                        <span className='md:block hidden'>|</span>
                        <a href='#'>Hotline: +1 234 567 890</a>
                    </div>
                    <div>
                        <select className="bg-transparent outline-none text-white text-sm">
                            <option className='text-black'>English</option>
                            <option className='text-black'>বাংলা</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <div className="bg-bg-white">
                <div className="container mx-auto flex flex-row items-center justify-between px-4 py-4">
                    {/* Logo */}
                    <div className="">
                        <img className="md:w-[200px] w-[100px]" src='./GETSTYLED-300X100.png' alt='' />
                    </div>

                    {/* Search Bar */}
                    <div className="w-full flex-grow hidden sm:mx-8 md:flex items-center">
                        {isMobile && !searchOpen ? (
                            <FaSearch className="text-primary text-xl cursor-pointer" onClick={() => setSearchOpen(true)} />
                        ) : (
                            <div className="relative flex w-full max-w-md">
                                <input
                                    type="text"
                                    placeholder="Search product"
                                    className="input input-bordered outline-none focus:outline-none bg-bg-white text-black w-full"
                                    onChange={(e)=>setKeyword(e.target.value)}
                                />
                                <Link to={keyword.length > 0?`/by-keyword/${keyword}`:''} className="absolute btn right-0 bg-bg-primary hover:bg-bg-secondary border-primary hover:border-primary text-white">
                                    <FaSearch />
                                </Link>
                                {isMobile && searchOpen && (
                                    <FaTimes className="absolute left-2 top-1/2 transform -translate-y-1/2 text-rose-700 cursor-pointer" onClick={() => setSearchOpen(false)} />
                                )}
                            </div>
                        )}
                    </div>

                    <div className='flex items-center gap-5'>
                        {/* Icons */}
                        {
                            isLogin()?(
                                <div className="flex space-x-4 items-center">
                                    <Link to='/cart' className="relative">
                                        <RiShoppingBag4Line className="text-primary text-3xl" />
                                        <span className="absolute -top-1 -right-1 text-xs text-white bg-bg-primary rounded-full px-1">{CartCount}</span>
                                    </Link>
                                    <Link to='/wish' className="relative">
                                        <CiHeart className="text-rose-700 text-3xl" />
                                        <span className="absolute -top-1 -right-1 text-xs text-white bg-bg-primary rounded-full px-1">{WishCount}</span>
                                    </Link>
                                </div>
                            ): (
                                <div className="flex space-x-4 items-center">
                                    <Link to='/login' className="relative">
                                        <CiHeart className="text-primary text-3xl"/>
                                        <span
                                            className="absolute -top-1 -right-1 text-xs text-white bg-bg-primary rounded-full px-1">0</span>
                                    </Link>
                                    <Link to='login' className="relative">
                                        <RiShoppingBag4Line className="text-rose-700 text-3xl"/>
                                        <span
                                            className="absolute -top-1 -right-1 text-xs text-white bg-bg-primary rounded-full px-1">0</span>
                                    </Link>
                                </div>
                            )
                        }

                        {
                            isLogin() ? (
                                <div className="md:flex hidden gap-5 items-center whitespace-nowrap">
                                    <Link to='/dashboard'
                                          className='text-base border border-primary hover:bg-bg-primary font-medium text-rose-700 hover:text-white px-5 py-2 rounded-md transition-all duration-300 ease-in-out'>Dashboard</Link>
                                    <button onClick={() => setShowModal(true)}
                                            className='text-base bg-bg-primary hover:bg-bg-secondary font-medium text-white px-5 py-2 rounded-md transition-all duration-300 ease-in-out'>
                                    Logout
                                    </button>
                                </div>
                            ): (
                                <div className="md:flex hidden gap-5 items-center whitespace-nowrap">
                                    <Link to='/signup'
                                          className='text-base border border-primary hover:bg-bg-primary font-medium text-rose-700 hover:text-white px-5 py-2 rounded-md transition-all duration-300 ease-in-out'>Sign
                                        up</Link>
                                    <Link to='/login'
                                          className='text-base bg-bg-primary hover:bg-bg-secondary font-medium text-white px-5 py-2 rounded-md transition-all duration-300 ease-in-out'>Login</Link>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            {/* Navigation Links and Categories Menu */}
            <div className="bg-bg-white border-t border-gray-200">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div
                        className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 items-center text-gray-700">
                        <Select
                            options={categoryOptions}
                            className="w-full sm:w-48"
                            placeholder="Categories"
                            onChange={handleCategoryChange}
                        />
                        <div className="hidden md:flex flex-col md:flex-row space-y-2 sm:space-y-0 lg:space-x-6 md:space-x-4">
                            {navMenu.map((item, i) => (
                                <Link
                                    key={i}
                                    to={item.path}
                                    className={`text-black text-opacity-60 font-medium hover:text-primary hover:text-opacity-80 transition ease-in-out duration-300 
                                    ${location.pathname === item.path ? "text-primary text-opacity-80" : ""}`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Hamburger Menu */}
                    {isMobile && (
                        menuOpen ? (
                            <FaTimes className="text-primary text-2xl ml-4 cursor-pointer" onClick={() => setMenuOpen(false)} />
                        ) : (
                            <FaBarsStaggered className="text-primary text-2xl ml-4 cursor-pointer" onClick={() => setMenuOpen(true)} />
                        )
                    )}
                </div>
            </div>

            {/* Fullscreen Menu Overlay for Mobile */}
            <div className={`fixed inset-0 bg-bg-white z-50 transform ${menuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-out flex flex-col p-4 space-y-4`}>
                <div className="flex justify-between items-center">
                    <div className="">
                        <img className="md:w-[200px] w-[100px]" src='./GETSTYLED-300X100-N.png' alt='' />
                    </div>
                    <FaTimes className="text-primary text-2xl cursor-pointer" onClick={() => setMenuOpen(false)} />
                </div>
                <nav className="flex flex-col items-start gap-5 text-lg text-gray-700">
                    {
                        navMenu.map((item, i) => (
                            <Link key={i} to={item.path} className={`text-black text-opacity-60 hover:text-primary hover:text-opacity-80 font-semibold mt-2 border-b border-rose-100 w-full transition ease-in-out duration-300 ${location.pathname === item.path?"text-primary text-opacity-80":""}`}>
                                {item.name}
                            </Link>
                        ))
                    }
                </nav>
                {
                    isLogin()?(
                        <div className="flex flex-col gap-5">
                            <Link to='/dashboard' className="btn border border-primary hover:border-primary bg-transparent hover:bg-transparent text-lg font-semibold text-rose-700 mt-5">
                                Dashboard
                            </Link>
                            <button
                                onClick={() => setShowModal(true)}
                                className="btn bg-bg-primary hover:bg-secondary text-lg font-semibold text-white">
                                Logout
                            </button>
                        </div>
                    ): (
                        <div className="flex flex-col gap-5">
                            <Link to='/signup'
                                  className="btn border border-primary hover:border-primary bg-transparent hover:bg-transparent text-lg font-semibold text-primary hover:text-primary mt-5">Sign
                                up</Link>
                            <Link to='/login'
                                  className="btn bg-bg-primary hover:bg-secondary text-lg font-semibold text-white">Login</Link>
                        </div>
                    )
                }
            </div>

            <ToastContainer
                position="top-right"
                autoClose={1500}
                closeButton={false}
            />

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-5 rounded-md shadow-lg w-80">
                        <h3 className="text-black text-opacity-90 text-xl font-semibold mb-4">Are you sure you want to logout?</h3>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-300 text-black px-4 py-2 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="bg-primary hover:bg-secondary text-white px-5 py-2 rounded-md"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppNavbar;
