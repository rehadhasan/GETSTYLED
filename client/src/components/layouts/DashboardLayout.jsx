import React, { useState } from "react";
import Sidebar from "./Sidebar";

const DashboardLayout = (props) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar for larger screens */}
            <div className="hidden lg:block">
                <Sidebar />
            </div>

            {/* Sidebar for mobile */}
            <div className="lg:hidden">
                <Sidebar
                    isMobile
                    isOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                />
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-gray-100 overflow-auto scroll-smooth">
                <header className="p-4 flex items-center justify-between bg-white shadow">
                    <button
                        className="lg:hidden"
                        onClick={toggleSidebar}
                    >
                        ☰
                    </button>
                    <h1 className="text-lg font-bold">Dashboard</h1>
                </header>
                <main className="">{props.children}</main>
            </div>
        </div>
    );
};

export default DashboardLayout;
