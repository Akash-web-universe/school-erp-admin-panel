import Sidebar from "../sidebar/Sidebar";
import NewClassRoom from "./NewClassRoom";
import AdminHeader from "../main-components/AdminHeader";
import ClassRoomList from "./ClassRoomList";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ErrorBoundary from "../main-components/ErrorBoundary";

const ClassRoomPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check for the token in sessionStorage on mount
    const token = sessionStorage.getItem("authToken");

    // If the token is not found, redirect the user to the login page
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

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
          <ErrorBoundary>
            <ClassRoomList />
          </ErrorBoundary>
          <NewClassRoom />
        </div>
      </div>
    </div>
  );
};

export default ClassRoomPage;
