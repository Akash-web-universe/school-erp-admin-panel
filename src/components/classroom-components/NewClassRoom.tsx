import React, { useState, ChangeEvent, FormEvent } from "react";
import useClassRoom from "../../hooks/classroom/useClassRoom";

// ✅ Define the form state structure
interface ClassData {
  standard: string;
  section: string;
  first_language: string;
  second_language: string;
}

const NewClassRoom: React.FC = () => {
  const { createClassRoom, loading, error } = useClassRoom();

  const [classData, setClassData] = useState<ClassData>({
    standard: "",
    section: "",
    first_language: "",
    second_language: "",
  });

  // ✅ Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setClassData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  // ✅ Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("standard", classData.standard);
    formData.append("section", classData.section);
    formData.append("first_language", classData.first_language);
    formData.append("second_language", classData.second_language);

    try {
      await createClassRoom(formData);
      alert("🎉 Classroom created successfully!");
      setClassData({ standard: "", section: "", first_language: "", second_language: "" });
    } catch (err) {
      console.error("❌ Failed to create classroom:", err);
      alert("❌ Error: " + (err instanceof Error ? err.message : "Something went wrong."));
    }
  };

  return (
    <div className="create-classroom-container">
      <h2>Create Classroom</h2>
      <form onSubmit={handleSubmit} className="create-form">
        {/* ✅ Standard Input */}
        <div className="flex flex-col">
          <label>Standard:</label>
          <input
            type="text"
            name="standard"
            placeholder="Enter standard"
            value={classData.standard}
            onChange={handleChange}
            required
          />
        </div>

        {/* ✅ Section Dropdown */}
        <div className="flex flex-col">
          <label>Section:</label>
          <select name="section" value={classData.section} onChange={handleChange} required>
            <option value="" disabled>Select Section</option>
            {["A", "B", "C", "D", "E", "F"].map((section) => (
              <option key={section} value={section}>{section}</option>
            ))}
          </select>
        </div>

        {/* ✅ First Language Dropdown */}
        <div className="flex flex-col">
          <label>First Language:</label>
          <select name="first_language" value={classData.first_language} onChange={handleChange} required>
            <option value="" disabled>Select First Language</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Tamil">Tamil</option>
          </select>
        </div>

        {/* ✅ Second Language Dropdown */}
        <div className="flex flex-col">
          <label>Second Language:</label>
          <select name="second_language" value={classData.second_language} onChange={handleChange} required>
            <option value="" disabled>Select Second Language</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>

        {/* ✅ Submit Button */}
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Classroom"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default NewClassRoom;
