import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiMenu, 
  FiSearch, 
  FiCalendar,
  FiSun,
  FiMoon,
  FiHelpCircle,
  FiLogOut,
  FiUser,
  FiSettings,
  FiX,
  FiChevronDown
} from "react-icons/fi";
import { 
  HiOutlineSparkles, 
  HiOutlineAcademicCap,
  HiOutlineChartBar 
} from "react-icons/hi";
import { BsChatSquareDots } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { TbLayoutGridAdd } from "react-icons/tb";
import { MdMenu } from "react-icons/md";
import { toggleSidebarCollapse } from "../redux/features/ui/uiSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function ModernHeader({ user, logout, goToProfile, theme, toggleTheme }) {
  const collapsed = useSelector((state) => state.ui.sidebarCollapsed);
  const dispatch = useDispatch();
  
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mock data
  const notifications = [
    { 
      id: 1, 
      title: "New enrollment request", 
      description: "5 students pending approval",
      time: "5 min ago", 
      read: false,
      icon: <HiOutlineAcademicCap className="text-indigo-500" />,
      color: "indigo"
    },
    { 
      id: 2, 
      title: "Fee collection", 
      description: "₹45,000 collected today",
      time: "1 hour ago", 
      read: false,
      icon: <HiOutlineChartBar className="text-emerald-500" />,
      color: "emerald"
    },
    { 
      id: 3, 
      title: "Teacher meeting", 
      description: "Staff meeting at 3 PM",
      time: "2 hours ago", 
      read: true,
      icon: <BsChatSquareDots className="text-amber-500" />,
      color: "amber"
    },
    { 
      id: 4, 
      title: "System update", 
      description: "New features available",
      time: "Yesterday", 
      read: true,
      icon: <HiOutlineSparkles className="text-purple-500" />,
      color: "purple"
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
const handleMobileMenuToggle = () => {
  dispatch(toggleSidebarCollapse(!collapsed));
};
console.log("collapsed",collapsed);
  return (
    <>
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`h-20 w-[100vw] md:w-auto bg-white/80 backdrop-blur-xl  top-0 right-0 z-40 flex items-center justify-between px-4 md:px-8 border-b border-gray-100/50 shadow-sm transition-all duration-300 ${
          isMobile 
            ? 'left-0' 
            : (collapsed ? 'left-80' : 'left-20')
        }`}
      >
        {/* Left Section */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Mobile Menu Button */}
          {isMobile && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleMobileMenuToggle}
              className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
            >
              {collapsed ? <FiX size={22} /> : <FiMenu size={22} />}
            </motion.button>
          )}

          {/* Desktop Toggle Button */}
          {!isMobile && (
            <button
              onClick={() => dispatch(toggleSidebarCollapse())}
              className="bg-indigo-600 cursor-pointer text-white p-2 rounded-lg hover:bg-indigo-700 transition-all z-10 shadow-lg shadow-indigo-500/50 hidden lg:block"
            >
              <MdMenu className="w-4 h-4" />
            </button>
          )}

          <div className="flex items-center gap-3">
            <div className="hidden md:block h-10 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
           
            <div>
              <p className="text-xs font-medium text-gray-400 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-indigo-500" />
                Pages / Dashboard
              </p>
              <h1 className="text-xl md:block hidden font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Good {new Date().getHours() < 12 ? 'Morning' : 'Afternoon'}, {user?.firstName || 'Super Admin'}!
              </h1>
            </div>
          </div>
        </div>

        {/* Right Section - Rest of your header code (unchanged) */}
        <div className="flex items-center gap-1 md:gap-2">
          {/* Search Bar */}
          <div className="hidden lg:block relative">
            <motion.div 
              animate={{ width: searchOpen ? 280 : 200 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative"
            >
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setSearchOpen(false)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </motion.div>
          </div>

          {/* Date Badge */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="hidden xl:flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100"
          >
            <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center">
              <FiCalendar className="text-indigo-600" size={16} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Today</p>
              <p className="text-sm font-semibold text-gray-700">
                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </motion.div>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="relative w-9 h-9 md:w-10 md:h-10 flex items-center justify-center text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
          >
            {theme === 'light' ? <FiMoon size={18} /> : <FiSun size={18} />}
          </motion.button>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative w-9 h-9 md:w-10 md:h-10 flex items-center justify-center text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
            >
              <RiNotification3Line size={18} />
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-1 w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-indigo-200"
                >
                  {unreadCount}
                </motion.span>
              )}
            </motion.button>

            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
className="absolute -left-4/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-0 mt-3 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                >
                  {/* Header */}
                  <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-700">Notifications</h3>
                      <span className="text-xs text-indigo-600 bg-white px-2 py-1 rounded-lg shadow-sm">
                        {unreadCount} new
                      </span>
                    </div>
                  </div>

                  {/* Notifications List */}
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif, index) => (
                      <motion.div
                        key={notif.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-4 border-b border-gray-50 hover:bg-gray-50/80 cursor-pointer transition-all group ${
                          !notif.read ? 'bg-indigo-50/20' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-xl bg-${notif.color}-50 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0`}>
                            {notif.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-700 truncate">{notif.title}</p>
                            <p className="text-xs text-gray-400 mt-0.5 truncate">{notif.description}</p>
                            <p className="text-xs text-gray-300 mt-1">{notif.time}</p>
                          </div>
                          {!notif.read && (
                            <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0" />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="p-3 bg-gray-50/50 text-center">
                    <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium hover:underline">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Apps Launcher */}
          <motion.button
            whileHover={{ scale: 1.05, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex w-9 h-9 md:w-10 md:h-10 items-center justify-center text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
          >
            <TbLayoutGridAdd size={18} />
          </motion.button>

          {/* Profile Menu */}
          <div className="relative" ref={profileRef}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 md:gap-3 pl-1 md:pl-2 pr-2 md:pr-4 py-1 md:py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl md:rounded-2xl border border-indigo-100 hover:shadow-lg hover:shadow-indigo-100/50 transition-all"
            >
              {user?.profilePic?.secure_url ? (
                <img
                  src={user.profilePic.secure_url}
                  alt={user?.firstName}
                  className="w-8 h-8 md:w-9 md:h-9 rounded-xl object-cover ring-2 ring-white shadow-sm"
                />
              ) : (
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xs md:text-sm shadow-lg shadow-indigo-200">
                  {user?.firstName?.[0] || "A"}
                </div>
              )}
              <div className="hidden lg:block text-left">
                <p className="text-sm font-semibold text-gray-700">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  Super Admin
                </p>
              </div>
              <motion.div
                animate={{ rotate: profileOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <FiChevronDown className="text-gray-400" size={14} />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute right-0 mt-3 w-64 md:w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                >
                  {/* Profile Header */}
                  <div className="p-3 md:p-4 bg-gradient-to-r from-indigo-600 to-purple-600">
                    <div className="flex items-center gap-3">
                      {user?.profilePic?.secure_url ? (
                        <img
                          src={user.profilePic.secure_url}
                          alt={user?.firstName}
                          className="w-8 h-8 md:w-10 md:h-10 rounded-xl object-cover ring-4 ring-white/30"
                        />
                      ) : (
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-lg md:text-xl ring-4 ring-white/30">
                          {user?.firstName?.[0] || "A"}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-white font-semibold text-sm md:text-base truncate">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-white/80 text-xs mt-1 truncate">{user?.email || "admin@school.com"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    {[
                      { icon: <FiUser />, label: "My Profile", onClick: goToProfile, color: "indigo" },
                      { icon: <FiSettings />, label: "Account Settings", onClick: () => {}, color: "purple" },
                      { icon: <FiHelpCircle />, label: "Help Center", onClick: () => {}, color: "blue" },
                    ].map((item, index) => (
                      <motion.button
                        key={item.label}
                        whileHover={{ x: 5 }}
                        onClick={item.onClick}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 rounded-xl transition-all group"
                      >
                        <span className={`w-8 h-8 rounded-lg bg-${item.color}-50 flex items-center justify-center text-${item.color}-600 group-hover:scale-110 transition-transform flex-shrink-0`}>
                          {item.icon}
                        </span>
                        <span className="flex-1 text-left font-medium truncate">{item.label}</span>
                      </motion.button>
                    ))}

                    <div className="h-px bg-gray-100 my-2" />

                    <motion.button
                      whileHover={{ x: 5 }}
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-all group"
                    >
                      <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform flex-shrink-0">
                        <FiLogOut size={16} />
                      </span>
                      <span className="flex-1 text-left font-medium">Logout</span>
                    </motion.button>
                  </div>

                  {/* Footer */}
                  <div className="p-3 bg-gray-50/50 text-center border-t border-gray-100">
                    <p className="text-xs text-gray-400">
                      Version 2.0.0 • SchoolFlow
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.header>

      {/* Mobile Search Button */}
      {isMobile && (
        <button 
          onClick={() => setSearchOpen(!searchOpen)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl shadow-lg flex items-center justify-center z-50 hover:shadow-xl transition-all md:hidden"
        >
          <FiSearch size={24} />
        </button>
      )}

      {/* Mobile Search Modal */}
      <AnimatePresence>
        {isMobile && searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-0 right-0 bg-white p-4 shadow-lg z-40 md:hidden"
          >
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-100 border-0 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                autoFocus
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}