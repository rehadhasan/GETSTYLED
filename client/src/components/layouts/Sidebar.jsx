import React, { useState } from "react";
import { FiGrid, FiShoppingBag, FiHeart, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import UserStore from "../../store/UserStore.js";
import Cookies from "js-cookie";
import {toast} from "react-toastify";

const Sidebar = ({ isMobile, isOpen, toggleSidebar }) => {
    const {LogoutUserRequest} = UserStore()
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

    const menuItems = [
        { label: "Dashboard", icon: <FiGrid />, link: '/dashboard' },
        { label: "Orders", icon: <FiShoppingBag />, link: '/orders' },
        { label: "Favorite", icon: <FiHeart />, link: '/wish' },
        { label: "Profile", icon: <FiUser />, link: '/profile' },
        { label: "Settings", icon: <FiSettings />, link: '/settings' },
        { label: "Logout", icon: <FiLogOut />, link: '#', action: () => setIsModalOpen(true) },
    ];

    const handleLogout = async () => {
        let res = await LogoutUserRequest()
        if(res){
            localStorage.clear()
            sessionStorage.clear()
            Cookies.remove('token')
            toast.success("Logout Success")
            window.location.href = '/'
        }else{
            toast.error("Something went wrong")
        }
    };

    return (
        <div
            className={`${isMobile ? `fixed top-0 left-0 z-50 h-full ${isOpen ? "translate-x-0" : "-translate-x-full"}` : "relative h-screen"} bg-white shadow-lg transition-transform w-64`}
        >
            <div className="p-4 flex items-center justify-between">
                <div className="">
                    <img className="md:w-[150px] w-[100px]" src='./GETSTYLED-300X100.png' alt='' />
                </div>
                {isMobile && (
                    <button
                        onClick={toggleSidebar}
                        className="text-gray-600"
                    >
                        ✕
                    </button>
                )}
            </div>
            <div className="mt-4">
                <ul>
                    {menuItems.map((item, idx) => (
                        <li key={idx}>
                            {item.label === "Logout" ? (
                                <button
                                    onClick={item.action}
                                    className="flex items-center gap-3 p-3 hover:bg-gray-100 w-full text-left cursor-pointer"
                                >
                                    {item.icon}
                                    <span className='text-black text-opacity-90'>{item.label}</span>
                                </button>
                            ) : (
                                <Link
                                    to={item.link}
                                    className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
                                >
                                    {item.icon}
                                    <span className='text-black text-opacity-90'>{item.label}</span>
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Modal for Logout Confirmation */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-5 rounded-md shadow-lg w-80">
                        <h3 className="text-xl font-semibold mb-4">Are you sure you want to logout?</h3>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
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

export default Sidebar;
