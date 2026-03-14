
import { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Sidebar from "../components/Sidebar.jsx";
import Avatar, { genConfig } from "react-nice-avatar";
// import { logout } from "../redux/features/auth/authslice";
import { useDispatch } from "react-redux";
import { User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import apiPath from "../api/apiPath.js";
import { apiGet } from "../api/apiFetch.js";
import Header from "../components/Header.jsx";

export default function AdminLayout() {
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const dispacth = useDispatch();
    const baseurl = import.meta.env.VITE_API_BASE_URL;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef(null);
    const getStoredUser = () => {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    };

    // const user = JSON.parse(localStorage.getItem("user") || "{}");
    const storedUser = getStoredUser();

    const { data } = useQuery({
        queryKey: ["adminDetails"],
        queryFn: () => apiGet(apiPath.getAdminProfile),
        initialData: storedUser
            ? { results: storedUser }
            : undefined,
        staleTime: 5 * 60 * 1000,
    });

    const user = data?.results || {};
    console.log("userdetail", user);
    // console.log("user",user);
    const config = genConfig({ sex: "man", faceColor: "#d2a679", bgColor: "yellow" });

    const toggleSidebar = () => setSidebarOpen((prev) => !prev);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

    const goToProfile = () => {
        navigate("/admin/profile");
        setMenuOpen(false);
    };

    // Close menu on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="flex h-screen w-full bg-[var(--color-neutral)]">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} sidebarExpanded={sidebarExpanded} />
            {sidebarOpen && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 bg-black/40 z-[150] md:hidden"
                />
            )}


            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <Header setSidebarExpanded={setSidebarExpanded} sidebarExpanded={sidebarExpanded} />

                {/* Page Content */}
                <main className="flex-1 overflow-auto">
                    <div className="w-full overflow-x-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
