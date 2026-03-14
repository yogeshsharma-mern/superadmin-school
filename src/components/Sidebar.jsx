import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome,
  FaUsers,
  FaMoneyBillWave,
  FaServer,
  FaGraduationCap,
  FaChartLine,
  FaCog,
  FaShieldAlt,
  FaBook,
  FaCalendarAlt,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaClipboardList,
} from "react-icons/fa";
import { BiSolidSchool } from "react-icons/bi";
import { toggleSidebarCollapse,setSidebarCollapse } from "../redux/features/ui/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  MdOutlineSchool,
  MdOutlineSecurity,
  MdOutlineAnalytics,
  MdOutlineDashboard,
  MdOutlineSettings,
  MdOutlinePayment,
  MdOutlineDomain,
  MdOutlineSupervisorAccount,
} from "react-icons/md";

import {
  IoSettingsOutline,
  IoChevronDown,
  IoChevronUp,
  IoLogOutOutline,
  IoNotificationsOutline,
  IoHelpBuoyOutline,
} from "react-icons/io5";

import { BsGrid3X3Gap } from "react-icons/bs";

export default function SuperAdminSidebar() {
  const collapsed = useSelector((state) => state.ui.sidebarCollapsed);
  // const collapsed = useSelector((state)=>state.ui.sidebarCollappsed);
  const dispatch = useDispatch();

  const [openMenus, setOpenMenus] = useState({
    schools: false,
    billing: false,
    users: false,
    academics: false,
  });

  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  // const [mobileOpen, setMobileOpen] = useState(false);

  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // On mobile, sidebar should be hidden by default
      if (mobile) {
        dispatch(setSidebarCollapse(false));
        // setMobileOpen(false);
      } else {
        // On desktop, sidebar should be visible by default
        dispatch(setSidebarCollapse(true));
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, [dispatch]);

  // Handle body scroll when mobile menu is open
  // useEffect(() => {
  //   if (isMobile) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = 'unset';
  //   }

  //   return () => {
  //     document.body.style.overflow = 'unset';
  //   };
  // }, [collapsed]);

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleMobileClose = () => {
    dispatch(toggleSidebarCollapse(false));
  };

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative group
    ${isActive
      ? "text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30"
      : "text-gray-400 hover:text-white hover:bg-gray-800/60"
    }`;

  const subClass = ({ isActive }) =>
    `block px-4 py-2 text-sm rounded-lg transition-all duration-200 ml-6
    ${isActive
      ? "text-indigo-400 bg-indigo-500/10 font-medium"
      : "text-gray-400 hover:text-white hover:bg-gray-800/40"
    }`;

  const menuSections = [
    {
      title: "Overview",
      items: [
        { icon: FaHome, label: "Dashboard", path: "/superadmin/dashboard" },
        { icon: MdOutlineAnalytics, label: "Analytics", path: "/superadmin/analytics", badge: "Live" },
        { icon: FaChartLine, label: "Reports", path: "/superadmin/reports" },
        { icon: BiSolidSchool, label: "Schools", path: "/superadmin/schools" }
      ],
    },
    {
      title: "User Management",
      items: [
        {
          icon: FaUsers,
          label: "Users",
          menu: "users",
          subItems: [
            { label: "All Users", path: "/superadmin/users" },
            { label: "Roles & Permissions", path: "/superadmin/roles" },
            { label: "Admins", path: "/superadmin/admins" },
          ],
        },
      ],
    },
    {
      title: "Billing",
      items: [
        {
          icon: FaMoneyBillWave,
          label: "Billing",
          menu: "billing",
          subItems: [
            { label: "Subscription Plans", path: "/superadmin/plans" },
            { label: "School Subscriptions", path: "/superadmin/subscriptions" },
            { label: "Payments", path: "/superadmin/payments", badge: "12" },
            { label: "Invoices", path: "/superadmin/invoices" },
          ],
        },
      ],
    },
    {
      title: "System",
      items: [
        { icon: IoSettingsOutline, label: "Settings", path: "/superadmin/settings" },
        { icon: MdOutlineSecurity, label: "Security", path: "/superadmin/security" },
        { icon: FaServer, label: "Server Status", path: "/superadmin/server", badge: "99.9%" },
        { icon: FaShieldAlt, label: "Audit Logs", path: "/superadmin/audit" },
      ],
    },
  ];

  // Determine sidebar width based on state
  const sidebarWidth = isMobile
    ? (collapsed ? '280px' : '0px')
    : (collapsed ? '280px' : '80px');

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && collapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleMobileClose}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
          width: sidebarWidth
        }}
        transition={{ duration: 0.3 }}
        className={`h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-white flex flex-col border-r border-gray-800/50 shadow-2xl fixed lg:relative z-50 overflow-hidden ${isMobile && !collapsed ? 'invisible' : 'visible'
          }`}
        style={{
          width: sidebarWidth,
        }}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:16px_16px]" />
        </div>

        {/* Mobile Close Button */}
        {isMobile && (
          <button
            onClick={handleMobileClose}
            className="absolute top-4 right-4 z-50 p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white lg:hidden"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Logo Section */}
        <div className="relative p-6 border-b border-gray-800/50">
          <motion.div
            className="flex items-center gap-3"
            layout
          >
            <motion.div
              className="bg-gradient-to-br from-indigo-500 to-purple-600 w-12 h-12 flex items-center justify-center rounded-2xl font-bold text-xl shadow-lg shadow-indigo-500/30 relative group flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">S</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </motion.div>

            <AnimatePresence mode="wait">
              {(collapsed) && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h1 className="font-bold text-lg bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    SchoolFlow
                  </h1>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    Super Admin Portal
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {menuSections.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <AnimatePresence mode="wait">
                {(collapsed) && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-4"
                  >
                    {section.title}
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="space-y-1">
                {section.items.map((item) => (
                  <div key={item.label}>
                    {item.subItems ? (
                      <>
                        <motion.button
                          onClick={() => toggleMenu(item.menu)}
                          onHoverStart={() => setHoveredItem(item.label)}
                          onHoverEnd={() => setHoveredItem(null)}
                          className={`w-full cursor-pointer flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200 relative group
                            ${openMenus[item.menu] ? 'bg-gray-800/80 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800/60'}`}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="flex items-center gap-3">
                            <item.icon className={`w-5 h-5 transition-all duration-200 ${hoveredItem === item.label ? 'text-indigo-400' : ''
                              }`} />
                            {(collapsed) && (
                              <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                {item.label}
                              </motion.span>
                            )}
                          </span>
                          {(collapsed) && (
                            <motion.div
                              animate={{ rotate: openMenus[item.menu] ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {openMenus[item.menu] ? <IoChevronUp /> : <IoChevronDown />}
                            </motion.div>
                          )}
                        </motion.button>

                        <AnimatePresence>
                          {openMenus[item.menu] && (collapsed) && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="ml-6 mt-1 space-y-1 border-l-2 border-indigo-500/30 pl-2">
                                {item.subItems.map((subItem) => (
                                  <NavLink
                                    key={subItem.path}
                                    to={subItem.path}
                                    className={subClass}
                                    onClick={isMobile ? handleMobileClose : undefined}
                                  >
                                    <span className="flex items-center justify-between">
                                      {subItem.label}
                                      {subItem.badge && (
                                        <span className="px-1.5 py-0.5 text-xs bg-indigo-500/20 text-indigo-300 rounded-full">
                                          {subItem.badge}
                                        </span>
                                      )}
                                    </span>
                                  </NavLink>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <NavLink
                        to={item.path}
                        className={navClass}
                        onMouseEnter={() => setHoveredItem(item.label)}
                        onMouseLeave={() => setHoveredItem(null)}
                        onClick={isMobile ? handleMobileClose : undefined}
                      >
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="relative"
                        >
                          <item.icon className={`w-5 h-5 transition-all duration-200 ${hoveredItem === item.label ? 'text-indigo-300' : ''
                            }`} />
                        </motion.div>
                        {(collapsed) && (
                          <>
                            <span className="flex-1">{item.label}</span>
                            {item.badge && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="px-1.5 py-0.5 text-xs bg-indigo-500/20 text-indigo-300 rounded-full"
                              >
                                {item.badge}
                              </motion.span>
                            )}
                          </>
                        )}
                      </NavLink>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </nav>

        {/* Footer */}
        <motion.div
          className="relative border-t border-gray-800/50 p-4 space-y-2"
          layout
        >
          {(collapsed) && (
            <>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800/60 transition-all duration-200 group"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <IoNotificationsOutline className="w-5 h-5" />
                <span className="flex-1 text-left">Notifications</span>
                <span className="w-5 h-5 bg-red-500/20 text-red-400 text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </motion.button>
            </>
          )}

          <motion.button
            className={`w-full bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 text-red-400 hover:text-red-300 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border border-red-500/20 flex items-center justify-center gap-2 group`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <IoLogOutOutline className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            {(collapsed) && "Logout"}
          </motion.button>
        </motion.div>

        {/* User Profile Mini */}
        <AnimatePresence>
          {(collapsed) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="px-4 pb-4"
            >
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/40 border border-gray-700/50">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-gray-900 font-bold flex-shrink-0">
                  SA
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Super Admin</p>
                  <p className="text-xs text-gray-400 truncate">admin@schoolflow.com</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.aside>
    </>
  );
}