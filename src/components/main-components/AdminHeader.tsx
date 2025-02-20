import React from "react";
import ThemeToggle from "./ThemeToggle";

const AdminHeader: React.FC = () => {
  return (
    <div className="top-0 py-[1rem] flex justify-end pe-[2rem] pt-[1rem] bg-[var(--body-bg-color)]">
      <ThemeToggle />
    </div>
  );
};

export default AdminHeader;
