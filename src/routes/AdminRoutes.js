import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "../hooks/admin/useAuthContext";

// admin pages...

import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AddDoctor from "../pages/admin/AddDoctor";
import AddDepartment from "../pages/admin/AddDepartment";
import ClientView from "../pages/admin/ClientView";
import DoctorView from "../pages/admin/DoctorView";
import DepartmentView from "../pages/admin/DepartmentView";
import BookingView from "../pages/admin/BookingView";
import PrescriptionViewAdmin from "../pages/admin/PrescriptionViewAdmin";
import ErrorPage from "../pages/admin/ErrorPage";

function AdminRoutes() {
  const { admin } = useAuthContext();

  return (
    <Routes>
     
      <Route
        exact path="/admin"
        element={!admin ? <AdminLogin /> : <Navigate to="/admin/doctorView" />}
      />
      <Route
        exact path="/admin/addDoctor"
        element={admin ? <AddDoctor /> : <Navigate to="/admin" />}
      />
      <Route
        exact path="/admin/addDepartment"
        element={admin ? <AddDepartment /> : <Navigate to="/admin" />}
      />
      <Route
        exact path="/admin/clientView"
        element={admin ? <ClientView /> : <Navigate to="/admin" />}
      />
      <Route
        path="/admin/doctorView"
        element={admin ? <DoctorView /> : <Navigate to="/admin" />}
      />
      <Route
        exact path="/admin/departmentView"
        element={admin ? <DepartmentView /> : <Navigate to="/admin" />}
      />
      <Route
        exact path="/admin/bookingView"
        element={admin ? <BookingView /> : <Navigate to="/admin" />}
      />
      <Route
        exact path="/admin/PrescriptionView"
        element={admin ? <PrescriptionViewAdmin /> : <Navigate to="/admin" />}
      />

      {/* Catch-all route for displaying the ErrorPage */}
      <Route exact path="/admin/*" element={<ErrorPage />} />
    </Routes>
  );
}

export default AdminRoutes;

