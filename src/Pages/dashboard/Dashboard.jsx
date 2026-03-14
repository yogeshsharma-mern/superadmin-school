import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  HiOutlineUsers,
  HiOutlineCash,
  HiOutlineChartBar,
  HiOutlineTrendingUp,
  HiOutlineOfficeBuilding
} from "react-icons/hi";
import { 
  FiDownload, 
  FiCalendar,
  FiMoreVertical
} from "react-icons/fi";
import { 
  MdOutlineSchool, 
  MdOutlinePayments 
} from "react-icons/md";
import { 
  FaSchool,
  FaUserTie
} from "react-icons/fa";

// Essential Data Only
const statsData = {
  totalSchools: 45,
  totalStudents: 45680,
  totalRevenue: 24500000,
  activeSchools: 38,
  growthRate: 23.5
};

const monthlyRevenue = [
  { month: "Jan", revenue: 1800000 },
  { month: "Feb", revenue: 1950000 },
  { month: "Mar", revenue: 2100000 },
  { month: "Apr", revenue: 2250000 },
  { month: "May", revenue: 2400000 },
  { month: "Jun", revenue: 2550000 },
  { month: "Jul", revenue: 2700000 },
  { month: "Aug", revenue: 2850000 },
  { month: "Sep", revenue: 3000000 },
];

const schoolDistribution = [
  { name: "Active", value: 38, color: "#4F46E5" },
  { name: "Pending", value: 5, color: "#F59E0B" },
  { name: "Suspended", value: 2, color: "#EF4444" },
];

const recentSchools = [
  { id: 1, name: "Sunrise Academy", students: 850, revenue: "₹2.8L", status: "pending" },
  { id: 2, name: "Harbor International", students: 3200, revenue: "₹9.5L", status: "active" },
  { id: 3, name: "Springfield Elementary", students: 1250, revenue: "₹4.5L", status: "active" },
  { id: 4, name: "Mountain View", students: 560, revenue: "₹1.8L", status: "suspended" },
];

const StatCard = ({ icon: Icon, label, value, change, color }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
  >
    <div className="flex items-start justify-between">
      <div className={`w-12 h-12 rounded-xl bg-${color}-50 flex items-center justify-center`}>
        <Icon className={`text-${color}-600 text-2xl`} />
      </div>
      {change && (
        <span className={`text-${change > 0 ? 'green' : 'red'}-500 text-sm font-medium bg-${change > 0 ? 'green' : 'red'}-50 px-2 py-1 rounded-lg`}>
          {change > 0 ? '+' : ''}{change}%
        </span>
      )}
    </div>
    <div className="mt-4">
      <h3 className="text-sm text-gray-500">{label}</h3>
      <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
  </motion.div>
);

const SuperAdminDashboard = () => {
  return (
    <div className="min-h-screen w-[100vw] md:w-auto bg-gray-50 p-6 md:p-8">
      {/* Header */}
      <div className="block  md:flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, Super Admin</p>
        </div>
        <div className="flex gap-3">
          <button className="flex ml-auto mt-3 md:mt-auto items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50">
            <FiCalendar className="text-indigo-600" />
            <span>This Month</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-xl text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200">
            <FiDownload />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          icon={MdOutlineSchool} 
          label="Total Schools" 
          value={statsData.totalSchools} 
          change={12} 
          color="indigo" 
        />
        <StatCard 
          icon={HiOutlineUsers} 
          label="Total Students" 
          value={statsData.totalStudents.toLocaleString()} 
          change={8} 
          color="purple" 
        />
        <StatCard 
          icon={HiOutlineCash} 
          label="Total Revenue" 
          value={`₹${(statsData.totalRevenue/100000).toFixed(1)}L`} 
          change={23} 
          color="green" 
        />
        <StatCard 
          icon={FaSchool} 
          label="Active Schools" 
          value={statsData.activeSchools} 
          change={15} 
          color="blue" 
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Revenue Overview</h2>
              <p className="text-sm text-gray-500">Monthly revenue trend</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <FiMoreVertical className="text-gray-400" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fill: '#6B7280' }} />
              <YAxis tick={{ fill: '#6B7280' }} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#4F46E5" 
                strokeWidth={3}
                dot={{ fill: '#4F46E5', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* School Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">School Status</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={schoolDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {schoolDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            {schoolDistribution.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-gray-600">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Schools */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Recent Schools</h2>
            <p className="text-sm text-gray-500">Latest schools added to platform</p>
          </div>
          <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">School</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Students</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Revenue</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentSchools.map((school) => (
                <tr key={school.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                        <FaSchool className="text-indigo-600 text-sm" />
                      </div>
                      <span className="font-medium text-gray-800">{school.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{school.students}</td>
                  <td className="py-3 px-4 text-gray-600">{school.revenue}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg ${
                      school.status === 'active' ? 'bg-green-100 text-green-700' :
                      school.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        school.status === 'active' ? 'bg-green-500' :
                        school.status === 'pending' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`} />
                      {school.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl text-white text-left"
        >
          <MdOutlineSchool className="text-3xl mb-3" />
          <h3 className="font-semibold text-lg">Add New School</h3>
          <p className="text-indigo-100 text-sm mt-1">Create a new school in the platform</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl text-white text-left"
        >
          <FaUserTie className="text-3xl mb-3" />
          <h3 className="font-semibold text-lg">Add Admin</h3>
          <p className="text-purple-100 text-sm mt-1">Assign admin for a school</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl text-white text-left"
        >
          <MdOutlinePayments className="text-3xl mb-3" />
          <h3 className="font-semibold text-lg">View Reports</h3>
          <p className="text-green-100 text-sm mt-1">Check platform analytics</p>
        </motion.button>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;