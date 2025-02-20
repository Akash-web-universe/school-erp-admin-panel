import React from "react";
import Sidebar from "../sidebar/Sidebar";
import AdminHeader from "../main-components/AdminHeader";
import StaffList from "./StaffList";
import NewStaff from "./NewStaff";

const StaffPage: React.FC = () => {
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
          <NewStaff />
          <StaffList />
        </div>
      </div>
    </div>
  );
};

export default StaffPage;
