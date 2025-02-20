import React, { useEffect } from "react";
import useStudent from "../../hooks/student/useStudent";

const StudentList: React.FC = () => {
  const { fetchStudents, students, loading, error } = useStudent();

  // ✅ Fetch students when component mounts
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return (
    <div className="classroom-list-container p-4">
      <h2 className="text-xl font-semibold mb-4">Student List</h2>

      {loading && <p className="text-blue-500">Loading students...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && students.length === 0 && <p className="text-gray-500">No students found.</p>}

      {!loading && students.length > 0 && (
      
          <table className="table-container">
            <thead>
              <tr>
            
                <th>Name</th>
                <th>Gender</th>
                <th>Mobile</th>
                <th>DOB</th>
                <th>Register No</th>
                <th>Parent Mobile</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.id || student.register_no || index}> 
                 
                  <td>{student.name}</td>
                  <td>{student.gender}</td>
                  <td>{student.mobile_number}</td>
                  <td>{student.DOB}</td>
                  <td>{student.register_no}</td>
                  <td>{student.parent_mobile_number}</td>
                </tr>
              ))}
            </tbody>
          </table>
     
      )}
    </div>
  );
};

export default StudentList;
