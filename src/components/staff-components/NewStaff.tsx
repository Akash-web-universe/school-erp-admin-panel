import React, { useState, ChangeEvent, FormEvent } from "react";
import useStaff from "../../hooks/staff/useStaff";

// ✅ Define Staff data structure
interface StaffData {
  name: string;
  gender: string;
  email: string;
  mobile_number: string;
  DOB: string;
  address: string;
  education_qualification: string;
  staff_type: string;
  designation: string;
}

const NewStaff: React.FC = () => {
  const { createStaff, loading, error } = useStaff();
  const [staffData, setStaffData] = useState<StaffData>({
    name: "",
    gender: "",
    email: "",
    mobile_number: "",
    DOB: "",
    address: "",
    education_qualification: "",
    staff_type: "",
    designation: ""  
  });

  // ✅ Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setStaffData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  // ✅ Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(staffData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await createStaff(formData);
      alert("🎉 Staff created successfully!");
      setStaffData({ name: "", gender: "", email: "", mobile_number: "", DOB: "", address: "", education_qualification: "", staff_type: "", designation: "" });
    } catch (err) {
      alert(`❌ Failed to create staff: ${(err as Error).message}`);
    }
  };

  return (
    <div className="create-classroom-container">
      <h2 className="text-xl font-semibold mb-4">Create New Staff</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" name="name" placeholder="Name" value={staffData.name} onChange={handleChange} required />

        <select name="gender" value={staffData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input type="email" name="email" placeholder="Email" value={staffData.email} onChange={handleChange} required />

        <input type="text" name="mobile_number" placeholder="Mobile Number" value={staffData.mobile_number} onChange={handleChange} required />

        <input type="date" name="DOB" value={staffData.DOB} onChange={handleChange} required />

        <input type="text" name="address" placeholder="Address" value={staffData.address} onChange={handleChange} required />

        <input type="text" name="education_qualification" placeholder="Education Qualification" value={staffData.education_qualification} onChange={handleChange} required />

        <select name="staff_type" value={staffData.staff_type} onChange={handleChange} required>
          <option value="">Select Staff Type</option>
          <option value="Teacher">Teacher</option>
          <option value="Non-Teacher">Non-Teacher</option>
        </select>

        <input type="text" name="designation" placeholder="Designation" value={staffData.designation} onChange={handleChange} required />

        <button type="submit" disabled={loading} className="w-full">
          {loading ? "Creating..." : "Create"}
        </button>
      </form>

      {error && <p className="mt-3 text-red-500">{error}</p>}
    </div>
  );
};

export default NewStaff;
