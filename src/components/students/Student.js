import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Student = () => {
  const [student, setStudent] = useState({
    name: "",
    age: "",
    courses: ""
  });
  const { id } = useParams();
  useEffect(() => {
    loadStudent();
  }, []);
  const loadStudent = async () => {
    const res = await axios.get(`http://localhost:3000/students/${id}`);
    setStudent(res.data);
  };
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/">
        back to Home
      </Link>
      <h1 className="display-4">Student Id: {id}</h1>
      <hr />
      <ul className="list-group w-50" key={student.id}>
        <li className="list-group-item">name: {student.name}</li>
        <li className="list-group-item">user name: {student.age}</li>
        <li className="list-group-item">email: {student.courses}</li>
      </ul>
    </div>
  );
};

export default Student;
