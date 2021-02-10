import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Teacher = () =>{
    const { id } = useParams();
  const [teacher, setTeacher] = useState({
        name: "",
        subject: "",
        contact:"",
        courses:"",
    });

     useEffect(() =>{
        loadTeacher();
    }, []);

    const loadTeacher = async () => {
        const result = await axios.get(`http://localhost:5000/teachers/${id}`);
        setTeacher(result.data);
  };
  return(
    <div className="container py-4">
      <Link className="btn btn-primary" to="/">
        back to Home
      </Link>
      <h1 className="display-4">Teacher Id: {id}</h1>
      <hr />
      <ul className="list-group w-50" key={teacher.id}>
        <li className="list-group-item">Name: {teacher.name}</li>
        <li className="list-group-item">Subject: {teacher.subject}</li>
        <li className="list-group-item">Contact: {teacher.contact}</li>
        <li className="list-group-item">Courses: {teacher.courses}</li>
      </ul>
    </div>
  );
};

export default Teacher;

