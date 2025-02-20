import React, { useState, ChangeEvent, FormEvent } from "react";
import useStudent from "../../hooks/student/useStudent";

// ✅ Define Student data structure
interface StudentData {
  name: string;
  gender: string;
  mobile_number: string;
  DOB: string;
  register_no: string;
  parent_mobile_number: string;
}

const NewStudent: React.FC = () => {
  const { createStudent, loading, error } = useStudent();
  const [studentData, setStudentData] = useState<StudentData>({
    name: "",
    gender: "",
    mobile_number: "",
    DOB: "",
    register_no: "",
    parent_mobile_number: "",
  });

  // ✅ Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setStudentData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  // ✅ Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(studentData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await createStudent(formData);
      alert("🎉 Student registered successfully!");
      setStudentData({
        name: "",
        gender: "",
        mobile_number: "",
        DOB: "",
        register_no: "",
        parent_mobile_number: "",
      });
    } catch (err) {
      alert(`❌ Failed to register student: ${(err as Error).message}`);
    }
  };

  return (
    <div className="create-classroom-container">
      <h2 className="text-xl font-semibold mb-4">Register New Student</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={studentData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <select
          name="gender"
          value={studentData.gender}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          name="mobile_number"
          placeholder="Mobile Number"
          value={studentData.mobile_number}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="date"
          name="DOB"
          value={studentData.DOB}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="register_no"
          placeholder="Register Number"
          value={studentData.register_no}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="parent_mobile_number"
          placeholder="Parent Mobile Number"
          value={studentData.parent_mobile_number}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {error && <p className="mt-3 text-red-500">{error}</p>}
    </div>
  );
};

export default NewStudent;
