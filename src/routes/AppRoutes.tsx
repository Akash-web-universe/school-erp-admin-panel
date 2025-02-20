import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AdminDashboard from "../components/admindashboard/AdminDashboard";
import ClassRoomPage from "../components/classroom-components/ClassRoomPage";
import StaffPage from "../components/staff-components/StaffPage";
import StudentPage from "../components/student-components/StudentPage";
import React from 'react';
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/classroom" element={<ClassRoomPage />} />
      <Route path="/staff" element={<StaffPage />} />
      <Route path="/student" element={<StudentPage />} />
    </Routes>
  );
};

export default AppRoutes;
