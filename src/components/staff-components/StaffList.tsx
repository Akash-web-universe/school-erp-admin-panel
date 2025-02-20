import React, { useEffect } from "react";
import useStaff from "../../hooks/staff/useStaff";
import { useNavigate } from "react-router-dom";

// Define the Staff interface
interface Staff {
  id?: string; // ID may be optional
  name: string;
  gender: string;
  email: string;
  mobile_number: string;
 
}

const StaffList: React.FC = () => {
  const { fetchStaffs, staffs, loading, error } = useStaff();
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    fetchStaffs();
  }, [fetchStaffs]);

  

  return (
    <div className="classroom-list-container pb-[2rem]">
      <h2>Staff List</h2>

      {loading && <p>Loading staff...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {staffs.length > 0 ? (
        <table className="">
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Mobile Number</th>
            </tr>
          </thead>
          <tbody>
            {staffs.map((staff: Staff, index: number) => (
              <tr key={staff.id || index}>
                <td>{staff.name}</td>
                <td>{staff.gender}</td>
                <td>{staff.email}</td>
                <td>{staff.mobile_number}</td>
              
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No staff found.</p>
      )}
   
    </div>
  );
};

export default StaffList;
