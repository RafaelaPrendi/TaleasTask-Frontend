import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Student = () => {
  const [student, setStudent] = useState({
    name: "",
    age: "",
    courses: []
  });
  const { id } = useParams();
  useEffect(() => {
    loadStudent();
  }, []);
  const loadStudent = async () => {
    const res = await axios.get(`https://iblxzll8p9.execute-api.eu-central-1.amazonaws.com/dev/students/${id}`);
    setStudent(res.data);
  };
  return (
    <div className="container py-4 card">
      <ul className="list-group w-50 card-body" key={student.id}>
        <h5 className="card-title">Student's Details</h5>
        <li className="list-group-item"><strong>Name:</strong> {student.name}</li>
        <li className="list-group-item"><strong>Age:</strong> {student.age}</li>
        <li className="list-group-item"><strong>Number of courses:</strong> {student.courses.length}</li>
        <li className="list-group-item"><strong>Courses:</strong>
        <ul className="list-group w-50">
          {student.courses.map((course)=>
                    <li className="list-group-item" key={course.id}>{course.name}</li>)}
        </ul>   
         </li>
      </ul>
      <Link className="card-link btn btn-sm btn-success" to="/">
        Back to Students
      </Link>
        <p>Student Id: {id}</p>
    </div>
  );
};

export default Student;
