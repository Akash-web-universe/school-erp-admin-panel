import React, { useEffect } from "react";
import useClassRoom from "../../hooks/classroom/useClassRoom";

// ✅ Define Classroom List Component

const ClassRoomList: React.FC = () => {
  const { fetchClassRooms, classrooms, loading, error } = useClassRoom();

  // Fetch classrooms when the component mounts
  useEffect(() => {
    fetchClassRooms();
  }, [fetchClassRooms]);

  const sortedClassrooms = [...classrooms].sort((a, b) => {
    const standardA = parseInt(a.standard, 10);
    const standardB = parseInt(b.standard, 10);
  
    if (isNaN(standardA) || isNaN(standardB)) {
      // If either standard is not a number, consider it as 0
      return 0;
    }
  
    return standardA - standardB;
  });

  return (
    <div className="classroom-list-container">
      <h2>Classrooms</h2>

      {loading && <p>Loading classrooms...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {sortedClassrooms.length > 0 ? (
        <table className="table-container">
          <thead>
            <tr>
              <th>Standard</th>
              <th>Section</th>
              <th>First Language</th>
              <th>Second Language</th>
            </tr>
          </thead>
          <tbody>
            {sortedClassrooms.map((classroom) => (
              <tr key={classroom.id}>
                <td>{classroom.standard}</td>
                <td>{classroom.section}</td>
                <td>{classroom.first_language}</td>
                <td>{classroom.second_language}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No classrooms available.</p>
      )}
    </div>
  );
};

export default ClassRoomList;
