import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import confirm from "reactstrap-confirm";


const Home = () => {
  const [students, setStudent] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const result = await axios.get("http://localhost:5000/students");
    setStudent(result.data.reverse());
  };
  
  const deleteStudent = async id => {
    let result = await confirm({
      message: "Are you sure you want to delete this?",
    confirmText: "Delete",
    confirmColor: "danger",
    cancelColor: "link text-danger"
    });
    if(result){
      await axios.delete(`http://localhost:5000/students/${id}`);
    loadStudents();
    }
  };

  return (
    <div className="container">
      <div classnamename="py-4">
        <h3>Students list</h3>
        <table className="table border shadow">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <th scope="row">{index + 1}</th>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>
                  <Link className="btn btn-primary mr-2" to={`/students/${student.id}`}>
                    View More
                  </Link>
                  <Link
                    className="btn btn-outline-primary mr-2"
                    to={`/students/edit/${student.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    className="btn btn-danger"
                    onClick={() => deleteStudent(student.id)}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
