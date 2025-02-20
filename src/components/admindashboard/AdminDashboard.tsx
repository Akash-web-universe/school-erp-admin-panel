import React from "react";
import Sidebar from "../sidebar/Sidebar";
import AdminHeader from "../main-components/AdminHeader";
import DashboardData from "./DashboardData";

const AdminDashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-12 whole-container">
      <div className="col-span-2">
        <Sidebar />
      </div>
      <div className="col-span-10">
        <div>
          <AdminHeader />
        </div>
        <div className="body-container">
          <DashboardData />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
