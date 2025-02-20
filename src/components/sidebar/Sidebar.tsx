import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChalkboardTeacher, FaUsers, FaClipboardList, FaExpand, FaCompress } from "react-icons/fa";

// Define the sidebar item structure
interface SidebarItem {
  name: string;
  icon: React.ReactNode;
  route: string;
}

const Sidebar: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Sidebar items
  const sidebarItems: SidebarItem[] = [
    { name: "Dashboard", icon: <FaClipboardList />, route: "/dashboard" },
    { name: "Class Room", icon: <FaClipboardList />, route: "/classroom" },
    { name: "Staff", icon: <FaChalkboardTeacher />, route: "/staff" },
    { name: "Student", icon: <FaUsers />, route: "/student" },
  ];

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="sidebar flex  flex-col justify-between">
      <ul>
        <h1>LOGO</h1>
        {sidebarItems.map((item, index) => (
          <li key={index}>
            <Link to={item.route} className="sidebar-link">
              {item.icon} <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Fullscreen Toggle Button at Bottom */}
      <button className="fullscreen-btn flex items-center gap-3 p-4" onClick={toggleFullscreen}>
        {isFullscreen ? <FaCompress /> : <FaExpand />} Fullscreen
      </button>
    </div>
  );
};

export default Sidebar;
