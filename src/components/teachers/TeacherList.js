import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TeacherList = () =>{
    const [teachers, setTeacher] = useState([]);

    useEffect(()=>{
        loadTeachers();
    }, []);
    const loadTeachers = async () =>{
        const result = await axios.get("http://localhost:5000/teachers");
        setTeacher(result.data.reverse());
    };
    const deleteTeacher = async id => {
        await axios.delete(`http://localhost:5000/teachers/${id}`);
    };
    return(
           <div className="container">
      <div classnamename="py-4">
        <h3>Teachers list</h3>
        <table className="table border shadow">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Subject</th>
              <th scope="col">Contact</th>
              <th scope="col">Courses</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, index) => (
              <tr key={teacher.id}>
                <th scope="row">{index + 1}</th>
                <td>{teacher.name}</td>
                <td>{teacher.subject}</td>
                <td>{teacher.contact}</td>
                <td>{teacher.courses}</td>
                <td>
                  <Link className="btn btn-primary mr-2" to={`/teachers/${teacher.id}`}>
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mr-2"
                    to={`/teachers/edit/${teacher.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    className="btn btn-danger"
                    onClick={() => deleteTeacher(teacher.id)}
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

export default TeacherList;