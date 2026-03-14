import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './Routes/ProtectedRoute';
import PublicRoute from './Routes/PublicRoute';
import AdminLayout from './layouts/AdminLayout';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from './Pages/auth/Login';
import Dashboard from './Pages/dashboard/Dashboard';
import Schools from './Pages/schools/Schools';

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/superadmin" element={<AdminLayout />}>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='schools' element={<Schools/>}/>

          </Route>
        </Route>
      </Routes>
    </QueryClientProvider>
  )
}
