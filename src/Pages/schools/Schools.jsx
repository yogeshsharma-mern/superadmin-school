// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import apiPath from "../../api/apiPath";
// import { apiGet, apiPost, apiPut } from "../../api/apiFetch";
// import {
//   FiPlus,
//   FiEdit2,
//   FiTrash2,
//   FiEye,
//   FiMoreVertical,
//   FiCheckCircle,
//   FiXCircle,
//   FiMail,
//   FiPhone,
//   FiMapPin
// } from 'react-icons/fi';
// import { MdOutlineSchool } from 'react-icons/md';
// import { FaSchool, FaUserTie, FaGlobe } from 'react-icons/fa';
// import ReusableTable from '../../components/Table';
// import { useSelector } from 'react-redux';
// import { useMutation } from '@tanstack/react-query';
// import PhoneInput from 'react-phone-input-2';




// // Static data for schools
// const staticSchoolsData = [
//   {
//     id: 1,
//     name: "Springfield Elementary",
//     domain: "springfield.edu",
//     students: 1250,
//     teachers: 85,
//     status: "active",
//     plan: "Enterprise",
//     email: "admin@springfield.edu",
//     phone: "+1 555-0123",
//     address: "123 Education St, Springfield",
//     createdAt: "2023-01-15"
//   },
//   {
//     id: 2,
//     name: "Riverside High School",
//     domain: "riverside.edu",
//     students: 2100,
//     teachers: 120,
//     status: "active",
//     plan: "Professional",
//     email: "admin@riverside.edu",
//     phone: "+1 555-0124",
//     address: "456 River Rd, Riverside",
//     createdAt: "2023-03-20"
//   },
//   {
//     id: 3,
//     name: "Sunrise Academy",
//     domain: "sunrise.edu",
//     students: 850,
//     teachers: 45,
//     status: "pending",
//     plan: "Basic",
//     email: "admin@sunrise.edu",
//     phone: "+1 555-0125",
//     address: "789 Sunrise Blvd, Sunnyvale",
//     createdAt: "2023-06-10"
//   },
//   {
//     id: 4,
//     name: "Harbor International",
//     domain: "harbor.edu",
//     students: 3200,
//     teachers: 180,
//     status: "active",
//     plan: "Enterprise",
//     email: "admin@harbor.edu",
//     phone: "+1 555-0126",
//     address: "321 Harbor Dr, Bay City",
//     createdAt: "2023-02-05"
//   },
//   {
//     id: 5,
//     name: "Mountain View School",
//     domain: "mountainview.edu",
//     students: 560,
//     teachers: 32,
//     status: "suspended",
//     plan: "Basic",
//     email: "admin@mountainview.edu",
//     phone: "+1 555-0127",
//     address: "654 Mountain Ave, Hill Valley",
//     createdAt: "2023-04-12"
//   },
//   {
//     id: 6,
//     name: "Valley Grammar School",
//     domain: "valleygrammar.edu",
//     students: 980,
//     teachers: 52,
//     status: "active",
//     plan: "Professional",
//     email: "admin@valleygrammar.edu",
//     phone: "+1 555-0128",
//     address: "987 Valley St, Greenfield",
//     createdAt: "2023-07-18"
//   },
//   {
//     id: 7,
//     name: "Oakridge International",
//     domain: "oakridge.edu",
//     students: 1850,
//     teachers: 95,
//     status: "active",
//     plan: "Enterprise",
//     email: "admin@oakridge.edu",
//     phone: "+1 555-0129",
//     address: "147 Oak Ave, Forest Hill",
//     createdAt: "2023-05-22"
//   },
// ];

// export default function Schools() {
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [selectedSchool, setSelectedSchool] = useState(null);
//   const [filteredData, setFilteredData] = useState(staticSchoolsData);
//   const collapsed = useSelector((state) => state.ui.sidebarCollapsed);



//   // Table state
//   const [paginationState, setPaginationState] = useState({
//     pageIndex: 0,
//     pageSize: 10,
//   });
//   const [sortingState, setSortingState] = useState([]);
//   const [globalFilter, setGlobalFilter] = useState('');
//   const [columnFilters, setColumnFilters] = useState([]);

//   // Form state for add/edit
//   const [formData, setFormData] = useState({
//     name: '',
//     schoolEmail: '',
//     address: '',
//     email: '',
//     schoolPhone: '',
//     plan: 'Basic',
//     status: 'active'
//   });
//   console.log("formData", formData);

//   // Handle global filter (search)
//   React.useEffect(() => {
//     if (globalFilter) {
//       const filtered = staticSchoolsData.filter(school =>
//         school.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
//         school.domain.toLowerCase().includes(globalFilter.toLowerCase()) ||
//         school.email.toLowerCase().includes(globalFilter.toLowerCase())
//       );
//       setFilteredData(filtered);
//     } else {
//       setFilteredData(staticSchoolsData);
//     }
//   }, [globalFilter]);

//   const resetForm = () => {
//     setFormData({
//       name: '',
//       schoolEmail: '',
//       address: '',
//       email: '',
//       schoolPhone: '',
//       plan: 'Basic',
//       status: 'active'
//     });
//   };
//   const createMutation = useMutation({
//     mutationFn: (newSchool) => apiPost(apiPath.createSchool, newSchool),
//     onSuccess: (response) => {
//       // Invalidate and refetch schools list
//       queryClient.invalidateQueries(['schools']);

//       // Close modal and reset form
//       setShowAddModal(false);
//       resetForm();

//       // Optional: Show success message
//       console.log('School created successfully:', response);
//     },
//     onError: (error) => {
//       // Handle error
//       console.error('Error creating school:', error);
//       // You can set an error state to show in UI
//     }
//   });

//   const updateMutation = useMutation({
//     mutationFn: ({ id, data }) => apiPut(apiPath.schools.update(id), data),
//     onSuccess: (response) => {
//       // Invalidate and refetch schools list
//       queryClient.invalidateQueries(['schools']);

//       // Close modal and reset form
//       setShowEditModal(false);
//       setSelectedSchool(null);
//       resetForm();

//       // Optional: Show success message
//       console.log('School updated successfully:', response);
//     },
//     onError: (error) => {
//       console.error('Error updating school:', error);
//     }
//   });
//   const handleView = (school) => {
//     setSelectedSchool(school);
//     setShowViewModal(true);
//   };

//   const handleEdit = (school) => {
//     setSelectedSchool(school);
//     setFormData({
//       name: school.name,
//       schoolEmail: school.schoolEmail,
//       address: school.address,
//       email: school.email,
//       schoolPhone: school.phone,
//       plan: school.plan,
//       status: school.status
//     });
//     setShowEditModal(true);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this school?')) {
//       // For static data, just filter it out
//       const newData = filteredData.filter(school => school.id !== id);
//       setFilteredData(newData);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (selectedSchool) {
//       // Update existing school
//       // const updatedData = filteredData.map(school =>
//       //   school.id === selectedSchool.id ? { ...school, ...formData } : school
//       // );
//       updateMutation.mutate({
//         id: selectedSchool._id,
//         data: formData
//       });
//     } else {
//       // Add new school
//       // const newSchool = {
//       //   id: filteredData.length + 1,
//       //   ...formData,
//       //   students: 0,
//       //   teachers: 0,
//       //   createdAt: new Date().toISOString().split('T')[0]
//       // };
//       // console.log("new school", newSchool);
//       // setFilteredData([...filteredData, newSchool]);
//       // setShowAddModal(false);
//       createMutation.mutate(formData);

//     }
//     resetForm();
//     setSelectedSchool(null);
//   };

//   const handleExport = () => {
//     // Convert data to CSV
//     const headers = ['ID', 'Name', 'School Email', 'Students', 'Teachers', 'Status', 'Plan', 'Email', 'Phone'];
//     const csvData = filteredData.map(school => [
//       school.id,
//       school.name,
//       school.domain,
//       school.students,
//       school.teachers,
//       school.status,
//       school.plan,
//       school.email,
//       school.phone
//     ]);

//     const csvContent = [headers, ...csvData]
//       .map(row => row.join(','))
//       .join('\n');

//     const blob = new Blob([csvContent], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'schools.csv';
//     a.click();
//   };

//   // Table columns definition
//   const columns = [
//     {
//       accessorKey: 'name',
//       header: 'School Name',
//       cell: ({ row }) => (
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
//             <FaSchool className="text-indigo-600" />
//           </div>
//           <div>
//             <p className="font-medium text-gray-800">{row.original.name}</p>
//             <p className="text-xs text-gray-400">ID: {row.original.id}</p>
//           </div>
//         </div>
//       ),
//     },
//     {
//       accessorKey: 'School Email',
//       header: 'School Email',
//       cell: ({ getValue }) => (
//         <div className="flex items-center gap-2">
//           <FaGlobe className="text-gray-400" size={14} />
//           <span className="text-sm text-gray-600">{getValue()}</span>
//         </div>
//       ),
//     },
//     {
//       accessorKey: 'students',
//       header: 'Students',
//       cell: ({ getValue }) => (
//         <span className="text-sm font-medium text-gray-700">{getValue()}</span>
//       ),
//     },
//     {
//       accessorKey: 'teachers',
//       header: 'Teachers',
//       cell: ({ getValue }) => (
//         <span className="text-sm text-gray-600">{getValue()}</span>
//       ),
//     },
//     {
//       accessorKey: 'plan',
//       header: 'Plan',
//       cell: ({ getValue }) => {
//         const plan = getValue();
//         return (
//           <span className={`text-xs font-medium px-2 py-1 rounded-lg ${plan === 'Enterprise' ? 'bg-purple-100 text-purple-700' :
//             plan === 'Professional' ? 'bg-blue-100 text-blue-700' :
//               'bg-gray-100 text-gray-700'
//             }`}>
//             {plan}
//           </span>
//         );
//       },
//     },
//     {
//       accessorKey: 'status',
//       header: 'Status',
//       cell: ({ getValue }) => {
//         const status = getValue();
//         return (
//           <span className={`flex items-center gap-1 text-xs font-medium ${status === 'active' ? 'text-green-600' :
//             status === 'pending' ? 'text-yellow-600' :
//               'text-red-600'
//             }`}>
//             <span className={`w-1.5 h-1.5 rounded-full ${status === 'active' ? 'bg-green-500' :
//               status === 'pending' ? 'bg-yellow-500' :
//                 'bg-red-500'
//               }`} />
//             {status}
//           </span>
//         );
//       },
//     },
//     {
//       accessorKey: 'email',
//       header: 'Email',
//       cell: ({ getValue }) => (
//         <div className="flex items-center gap-2">
//           <FiMail className="text-gray-400" size={14} />
//           <span className="text-sm text-gray-600">{getValue()}</span>
//         </div>
//       ),
//     },
//     {
//       id: 'actions',
//       header: 'Actions',
//       cell: ({ row }) => (
//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => handleView(row.original)}
//             className="p-2 hover:bg-indigo-50 rounded-lg text-gray-400 hover:text-indigo-600 transition-all"
//             title="View"
//           >
//             <FiEye size={16} />
//           </button>
//           <button
//             onClick={() => handleEdit(row.original)}
//             className="p-2 hover:bg-blue-50 rounded-lg text-gray-400 hover:text-blue-600 transition-all"
//             title="Edit"
//           >
//             <FiEdit2 size={16} />
//           </button>
//           <button
//             onClick={() => handleDelete(row.original.id)}
//             className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-all"
//             title="Delete"
//           >
//             <FiTrash2 size={16} />
//           </button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="min-h-screen w-full bg-gray-50 p-6 md:p-8">
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">Schools Management</h1>
//           <p className="text-gray-500 mt-1">Manage all schools in the platform</p>
//         </div>

//         {/* Add School Button */}
//         <motion.button
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//           onClick={() => {
//             resetForm();
//             setSelectedSchool(null);
//             setShowAddModal(true);
//           }}
//           className="mt-4 md:mt-0 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200"
//         >
//           <FiPlus size={20} />
//           <span>Add New School</span>
//         </motion.button>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//           <div className="flex items-center gap-4">
//             <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
//               <MdOutlineSchool className="text-indigo-600 text-2xl" />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Total Schools</p>
//               <p className="text-2xl font-bold text-gray-800">{filteredData.length}</p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//           <div className="flex items-center gap-4">
//             <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
//               <FiCheckCircle className="text-green-600 text-2xl" />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Active</p>
//               <p className="text-2xl font-bold text-gray-800">
//                 {filteredData.filter(s => s.status === 'active').length}
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//           <div className="flex items-center gap-4">
//             <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
//               <FiMoreVertical className="text-yellow-600 text-2xl" />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Pending</p>
//               <p className="text-2xl font-bold text-gray-800">
//                 {filteredData.filter(s => s.status === 'pending').length}
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//           <div className="flex items-center gap-4">
//             <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
//               <FiXCircle className="text-red-600 text-2xl" />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Suspended</p>
//               <p className="text-2xl font-bold text-gray-800">
//                 {filteredData.filter(s => s.status === 'suspended').length}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Reusable Table */}
//       <div className={`overflow-auto ${collapsed ? "max-w-[1220px]" : "w-full"} `}>
//         <ReusableTable
//           columns={columns}
//           data={filteredData}
//           paginationState={paginationState}
//           setPaginationState={setPaginationState}
//           sortingState={sortingState}
//           setSortingState={setSortingState}
//           globalFilter={globalFilter}
//           setGlobalFilter={setGlobalFilter}
//           columnFilters={columnFilters}
//           setColumnFilters={setColumnFilters}
//           totalCount={filteredData.length}
//           tablePlaceholder="Search schools..."
//           loading={false}
//           fetching={false}
//           isError={false}
//           onExport={handleExport}
//           onRefresh={() => setFilteredData(staticSchoolsData)}
//         />
//       </div>

//       {/* Add/Edit School Modal */}
//       <AnimatePresence>
//         {(showAddModal || showEditModal) && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
//             onClick={() => {
//               setShowAddModal(false);
//               setShowEditModal(false);
//             }}
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, y: 20 }}
//               className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <h2 className="text-2xl font-bold text-gray-800 mb-6">
//                 {selectedSchool ? 'Edit School' : 'Add New School'}
//               </h2>

//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       School Name *
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       value={formData.name}
//                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                       className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                       placeholder="Enter school name"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       School Email *
//                     </label>
//                     <input
//                       type="email"
//                       required
//                       value={formData.schoolEmail}
//                       onChange={(e) => setFormData({ ...formData, schoolEmail: e.target.value })}
//                       className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                       placeholder="school.edu@gmail.com"
//                     />
//                   </div>
//                 </div>

              

//                 <div>

//                   {/* <input
//                     type="text"
//                     value={formData.phone}
//                     onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                     className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     placeholder="+1 555-0123"
//                   /> */}
//                   <PhoneInput
//                     country="in"
//                     enableSearch
//                     value={formData.schoolPhone}
//                     onChange={(phone) => {
//                       setFormData({ ...formData, schoolPhone:phone });
//                       // setErrors((p) => ({ ...p, phone: "" }));
//                     }}
//                     inputClass="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
//                   />
//                   {/* {errors.phone && (
//                     <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
//                       <span>⚠️</span> {errors.phone}
//                     </p>
//                   )} */}
//                 </div>
//   <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Email *
//                   </label>
//                   <input
//                     type="email"
//                     required
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     placeholder="admin@school.edu"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Address
//                   </label>
//                   <textarea
//                     value={formData.address}
//                     onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//                     className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     rows="3"
//                     placeholder="Enter school address"
//                   />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Plan
//                     </label>
//                     <select
//                       value={formData.plan}
//                       onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
//                       className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     >
//                       <option value="Basic">Basic</option>
//                       <option value="Professional">Professional</option>
//                       <option value="Enterprise">Enterprise</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Status
//                     </label>
//                     <select
//                       value={formData.status}
//                       onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//                       className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     >
//                       <option value="active">Active</option>
//                       <option value="pending">Pending</option>
//                       <option value="suspended">Suspended</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-4 pt-4">
//                   <button
//                     type="submit"
//                     className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all"
//                   >
//                     {selectedSchool ? 'Update School' : 'Create School'}
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setShowAddModal(false);
//                       setShowEditModal(false);
//                       resetForm();
//                     }}
//                     className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-all"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* View School Modal */}
//       <AnimatePresence>
//         {showViewModal && selectedSchool && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
//             onClick={() => setShowViewModal(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, y: 20 }}
//               className="bg-white rounded-2xl p-6 max-w-lg w-full"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
//                   <FaSchool className="text-indigo-600 text-3xl" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-800">{selectedSchool.name}</h2>
//                   <p className="text-gray-500">{selectedSchool.domain}</p>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="p-4 bg-gray-50 rounded-xl">
//                     <p className="text-xs text-gray-500">Students</p>
//                     <p className="text-xl font-bold text-gray-800">{selectedSchool.students}</p>
//                   </div>
//                   <div className="p-4 bg-gray-50 rounded-xl">
//                     <p className="text-xs text-gray-500">Teachers</p>
//                     <p className="text-xl font-bold text-gray-800">{selectedSchool.teachers}</p>
//                   </div>
//                 </div>

//                 <div className="p-4 bg-gray-50 rounded-xl">
//                   <p className="text-xs text-gray-500 mb-2">Contact Information</p>
//                   <div className="space-y-2">
//                     <div className="flex items-center gap-2 text-sm">
//                       <FiMail className="text-gray-400" />
//                       <span>{selectedSchool.email}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-sm">
//                       <FiPhone className="text-gray-400" />
//                       <span>{selectedSchool.phone}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-sm">
//                       <FiMapPin className="text-gray-400" />
//                       <span>{selectedSchool.address}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
//                   <div>
//                     <p className="text-xs text-gray-500">Plan</p>
//                     <p className={`text-sm font-medium mt-1 ${selectedSchool.plan === 'Enterprise' ? 'text-purple-700' :
//                       selectedSchool.plan === 'Professional' ? 'text-blue-700' :
//                         'text-gray-700'
//                       }`}>{selectedSchool.plan}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500">Status</p>
//                     <span className={`flex items-center gap-1 text-xs font-medium mt-1 ${selectedSchool.status === 'active' ? 'text-green-600' :
//                       selectedSchool.status === 'pending' ? 'text-yellow-600' :
//                         'text-red-600'
//                       }`}>
//                       <span className={`w-1.5 h-1.5 rounded-full ${selectedSchool.status === 'active' ? 'bg-green-500' :
//                         selectedSchool.status === 'pending' ? 'bg-yellow-500' :
//                           'bg-red-500'
//                         }`} />
//                       {selectedSchool.status}
//                     </span>
//                   </div>
//                 </div>

//                 <p className="text-xs text-gray-400 text-center mt-2">
//                   Created on: {new Date(selectedSchool.createdAt).toLocaleDateString()}
//                 </p>
//               </div>

//               <button
//                 onClick={() => setShowViewModal(false)}
//                 className="w-full mt-6 px-4 py-3 bg-gray-100 rounded-xl font-semibold hover:bg-gray-200 transition-all"
//               >
//                 Close
//               </button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiMoreVertical,
  FiCheckCircle,
  FiXCircle,
  FiMail,
  FiPhone,
  FiMapPin,
  FiAlertCircle
} from 'react-icons/fi';
import { MdOutlineSchool } from 'react-icons/md';
import { FaSchool, FaGlobe } from 'react-icons/fa';
import ReusableTable from '../../components/Table';
import apiPath from "../../api/apiPath";
import { apiGet, apiPost, apiPut, apiPatch } from "../../api/apiFetch";

export default function Schools() {
  const queryClient = useQueryClient();
  const collapsed = useSelector((state) => state.ui.sidebarCollapsed);
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    adminName: '',
    adminEmail: '',
    adminPhone: ''
  });
  
  // Error state
  const [errors, setErrors] = useState({});
  
  // Table state
  const [paginationState, setPaginationState] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sortingState, setSortingState] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState([]);

  // Fetch schools with pagination
  const { data: schoolsData, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['schools', paginationState.pageIndex, paginationState.pageSize, globalFilter],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: paginationState.pageIndex + 1,
        limit: paginationState.pageSize,
        ...(globalFilter && { search: globalFilter })
      });
      const response = await apiGet(`${apiPath.getAllSchools}?${params}`);
      return response.data;
    }
  });

  // Create school mutation
  const createMutation = useMutation({
    mutationFn: (newSchool) => apiPost(apiPath.createSchool, newSchool),
    onSuccess: () => {
      queryClient.invalidateQueries(['schools']);
      setShowAddModal(false);
      resetForm();
    },
    onError: (error) => {
      setErrors({ submit: error.response?.data?.message || 'Failed to create school' });
    }
  });

  // Update school status mutation
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => 
      apiPatch(`${apiPath.updateSchool}/${id}/status`, { isActive: status }),
    onSuccess: () => {
      queryClient.invalidateQueries(['schools']);
      setShowStatusModal(false);
      setSelectedSchool(null);
    },
    onError: (error) => {
      setErrors({ submit: error.response?.data?.message || 'Failed to update status' });
    }
  });

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'School name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'School email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.length < 10) {
      newErrors.phone = 'Phone number must be at least 10 digits';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.adminName.trim()) {
      newErrors.adminName = 'Admin name is required';
    }
    
    if (!formData.adminEmail.trim()) {
      newErrors.adminEmail = 'Admin email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.adminEmail)) {
      newErrors.adminEmail = 'Admin email is invalid';
    }
    
    if (!formData.adminPhone) {
      newErrors.adminPhone = 'Admin phone is required';
    } else if (formData.adminPhone.length < 10) {
      newErrors.adminPhone = 'Admin phone must be at least 10 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      adminName: '',
      adminEmail: '',
      adminPhone: ''
    });
    setErrors({});
  };

  const handleView = (school) => {
    setSelectedSchool(school);
    setShowViewModal(true);
  };

  const handleEdit = (school) => {
    setSelectedSchool(school);
    setFormData({
      name: school.name,
      email: school.email,
      phone: school.phone,
      address: school.address,
      adminName: school.adminName || '',
      adminEmail: school.adminEmail || '',
      adminPhone: school.adminPhone || ''
    });
    setShowEditModal(true);
  };

  const handleStatusChange = (school) => {
    setSelectedSchool(school);
    setShowStatusModal(true);
  };

  const handleStatusUpdate = () => {
    if (selectedSchool) {
      updateStatusMutation.mutate({
        id: selectedSchool._id,
        status: !selectedSchool.isActive
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (selectedSchool) {
        // For edit, you might have a separate update API
        // For now, we'll just show status update
        console.log('Edit school:', { id: selectedSchool._id, ...formData });
      } else {
        createMutation.mutate(formData);
      }
    }
  };

  const handleExport = () => {
    const schools = schoolsData?.schools || [];
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Address', 'Status', 'Admin Name', 'Admin Email', 'Created At'];
    const csvData = schools.map(school => [
      school._id,
      school.name,
      school.email,
      school.phone,
      school.address,
      school.isActive ? 'Active' : 'Inactive',
      school.registeredBy?.name || '',
      school.registeredBy?.email || '',
      new Date(school.createdAt).toLocaleDateString()
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'schools.csv';
    a.click();
  };

  // Table columns definition
  const columns = [
    {
      accessorKey: 'name',
      header: 'School Name',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
            <FaSchool className="text-indigo-600" />
          </div>
          <div>
            <p className="font-medium text-gray-800">{row.original.name}</p>
            <p className="text-xs text-gray-400">ID: {row.original._id?.slice(-6)}</p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'School Email',
      cell: ({ getValue }) => (
        <div className="flex items-center gap-2">
          <FiMail className="text-gray-400" size={14} />
          <span className="text-sm text-gray-600">{getValue()}</span>
        </div>
      ),
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
      cell: ({ getValue }) => (
        <div className="flex items-center gap-2">
          <FiPhone className="text-gray-400" size={14} />
          <span className="text-sm text-gray-600">{getValue()}</span>
        </div>
      ),
    },
    {
      accessorKey: 'registeredBy',
      header: 'Registered By',
      cell: ({ getValue }) => {
        const registeredBy = getValue();
        return (
          <span className="text-sm text-gray-600">
            {registeredBy?.name || 'N/A'}
          </span>
        );
      },
    },
    {
      accessorKey: 'isActive',
      header: 'Status',
      cell: ({ getValue }) => {
        const isActive = getValue();
        return (
          <span className={`flex items-center gap-1 text-xs font-medium ${
            isActive ? 'text-green-600' : 'text-red-600'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${
              isActive ? 'bg-green-500' : 'bg-red-500'
            }`} />
            {isActive ? 'Active' : 'Inactive'}
          </span>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Created',
      cell: ({ getValue }) => (
        <span className="text-sm text-gray-600">
          {new Date(getValue()).toLocaleDateString()}
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleView(row.original)}
            className="p-2 hover:bg-indigo-50 rounded-lg text-gray-400 hover:text-indigo-600 transition-all"
            title="View"
          >
            <FiEye size={16} />
          </button>
          <button
            onClick={() => handleStatusChange(row.original)}
            className={`p-2 hover:bg-${
              row.original.isActive ? 'yellow' : 'green'
            }-50 rounded-lg text-gray-400 hover:text-${
              row.original.isActive ? 'yellow' : 'green'
            }-600 transition-all`}
            title={row.original.isActive ? 'Deactivate' : 'Activate'}
          >
            {row.original.isActive ? <FiXCircle size={16} /> : <FiCheckCircle size={16} />}
          </button>
        </div>
      ),
    },
  ];

  const schools = schoolsData?.schools || [];
  const pagination = schoolsData?.pagination || { total: 0, page: 1, limit: 10, totalPages: 1 };

  return (
    <div className="min-h-screen w-[100vw] md:w-auto bg-gray-50 p-6 md:p-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Schools Management</h1>
          <p className="text-gray-500 mt-1">Manage all schools in the platform</p>
        </div>

        {/* Add School Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            resetForm();
            setSelectedSchool(null);
            setShowAddModal(true);
          }}
          className="mt-4 md:mt-0 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200"
        >
          <FiPlus size={20} />
          <span>Add New School</span>
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
              <MdOutlineSchool className="text-indigo-600 text-2xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Schools</p>
              <p className="text-2xl font-bold text-gray-800">{pagination.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <FiCheckCircle className="text-green-600 text-2xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active</p>
              <p className="text-2xl font-bold text-gray-800">
                {schools.filter(s => s.isActive).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
              <FiXCircle className="text-red-600 text-2xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Inactive</p>
              <p className="text-2xl font-bold text-gray-800">
                {schools.filter(s => !s.isActive).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <FiMoreVertical className="text-purple-600 text-2xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Pages</p>
              <p className="text-2xl font-bold text-gray-800">{pagination.totalPages}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {isError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-center gap-3">
            <FiAlertCircle className="text-red-600" size={20} />
            <p className="text-red-600">{error?.message || 'Failed to load schools'}</p>
          </div>
        </div>
      )}

      {/* Reusable Table */}
      <div className={`overflow-auto ${collapsed ? "max-w-[1220px]" : "w-full"}`}>
        <ReusableTable
          columns={columns}
          data={schools}
          paginationState={paginationState}
          setPaginationState={setPaginationState}
          sortingState={sortingState}
          setSortingState={setSortingState}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          totalCount={pagination.total}
          tablePlaceholder="Search schools..."
          loading={isLoading}
          fetching={isLoading}
          isError={isError}
          error={error}
          onExport={handleExport}
          onRefresh={refetch}
        />
      </div>

      {/* Add School Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New School</h2>

              {errors.submit && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-600 text-sm">{errors.submit}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">School Information</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      School Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-2.5 border ${
                        errors.name ? 'border-red-500' : 'border-gray-200'
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      placeholder="Enter school name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      School Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-2.5 border ${
                        errors.email ? 'border-red-500' : 'border-gray-200'
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      placeholder="school@gmail.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      School Phone *
                    </label>
                    <PhoneInput
                      country="in"
                      enableSearch
                      value={formData.phone}
                      onChange={(phone) => setFormData({ ...formData, phone })}
                      inputClass={`w-full p-3 rounded-xl border ${
                        errors.phone ? 'border-red-500' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className={`w-full px-4 py-2.5 border ${
                        errors.address ? 'border-red-500' : 'border-gray-200'
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      placeholder="Enter address"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-700 pt-4">Admin Information</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Admin Name *
                    </label>
                    <input
                      type="text"
                      value={formData.adminName}
                      onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
                      className={`w-full px-4 py-2.5 border ${
                        errors.adminName ? 'border-red-500' : 'border-gray-200'
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      placeholder="Enter admin name"
                    />
                    {errors.adminName && (
                      <p className="text-red-500 text-xs mt-1">{errors.adminName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Admin Email *
                    </label>
                    <input
                      type="email"
                      value={formData.adminEmail}
                      onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
                      className={`w-full px-4 py-2.5 border ${
                        errors.adminEmail ? 'border-red-500' : 'border-gray-200'
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      placeholder="admin@gmail.com"
                    />
                    {errors.adminEmail && (
                      <p className="text-red-500 text-xs mt-1">{errors.adminEmail}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin Phone *
                  </label>
                  <PhoneInput
                    country="in"
                    enableSearch
                    value={formData.adminPhone}
                    onChange={(phone) => setFormData({ ...formData, adminPhone: phone })}
                    inputClass={`w-full p-3 rounded-xl border ${
                      errors.adminPhone ? 'border-red-500' : 'border-gray-200'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  />
                  {errors.adminPhone && (
                    <p className="text-red-500 text-xs mt-1">{errors.adminPhone}</p>
                  )}
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={createMutation.isLoading}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50"
                  >
                    {createMutation.isLoading ? 'Creating...' : 'Create School'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      resetForm();
                    }}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View School Modal */}
      <AnimatePresence>
        {showViewModal && selectedSchool && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowViewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl p-6 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                  <FaSchool className="text-indigo-600 text-3xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedSchool.name}</h2>
                  <p className="text-gray-500">ID: {selectedSchool._id}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500">Status</p>
                    <span className={`flex items-center gap-1 text-sm font-medium mt-1 ${
                      selectedSchool.isActive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        selectedSchool.isActive ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                      {selectedSchool.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500">Slug</p>
                    <p className="text-sm font-medium text-gray-700 mt-1">{selectedSchool.slug}</p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-2">School Contact</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <FiMail className="text-gray-400" />
                      <span>{selectedSchool.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FiPhone className="text-gray-400" />
                      <span>{selectedSchool.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FiMapPin className="text-gray-400" />
                      <span>{selectedSchool.address}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-2">Registered By</p>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-700">{selectedSchool.registeredBy?.name}</p>
                    <p className="text-xs text-gray-500">{selectedSchool.registeredBy?.email}</p>
                  </div>
                </div>

                <p className="text-xs text-gray-400 text-center">
                  Created: {new Date(selectedSchool.createdAt).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => setShowViewModal(false)}
                className="w-full mt-6 px-4 py-3 bg-gray-100 rounded-xl font-semibold hover:bg-gray-200 transition-all"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Change Modal */}
      <AnimatePresence>
        {showStatusModal && selectedSchool && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowStatusModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className={`w-16 h-16 mx-auto rounded-2xl ${
                  selectedSchool.isActive ? 'bg-yellow-100' : 'bg-green-100'
                } flex items-center justify-center mb-4`}>
                  {selectedSchool.isActive ? (
                    <FiXCircle className="text-yellow-600 text-3xl" />
                  ) : (
                    <FiCheckCircle className="text-green-600 text-3xl" />
                  )}
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedSchool.isActive ? 'Deactivate School' : 'Activate School'}
                </h2>
                <p className="text-gray-500 mt-2">
                  Are you sure you want to {selectedSchool.isActive ? 'deactivate' : 'activate'} {selectedSchool.name}?
                </p>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={handleStatusUpdate}
                  disabled={updateStatusMutation.isLoading}
                  className={`flex-1 px-4 py-3 ${
                    selectedSchool.isActive 
                      ? 'bg-yellow-600 hover:bg-yellow-700' 
                      : 'bg-green-600 hover:bg-green-700'
                  } text-white rounded-xl font-semibold transition-all disabled:opacity-50`}
                >
                  {updateStatusMutation.isLoading ? 'Updating...' : 'Yes, Proceed'}
                </button>
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}