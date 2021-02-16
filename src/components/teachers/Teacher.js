import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Teacher = () =>{
    const { id } = useParams();
  const [teacher, setTeacher] = useState({
        name: "",
        subject: "",
        contact:"",
        courses:[]
    });

     useEffect(() =>{
        loadTeacher();
    }, []);

    const loadTeacher = async () => {
        const result = await axios.get(`http://localhost:5000/teachers/${id}`);
        setTeacher(result.data);
  };
  return(
    <div className="container py-4 card">
      <ul className="list-group w-50 card-body" key={teacher.id}>
        <h5 className="card-title">Teacher's Details</h5>
        <li className="list-group-item"><strong>Name: </strong>{teacher.name}</li>
        <li className="list-group-item"><strong>Subject: </strong>{teacher.subject}</li>
        <li className="list-group-item"><strong>Contact: </strong>{teacher.contact}</li>
        <li className="list-group-item"><strong>Number of courses: </strong>{teacher.courses.length}</li>
        <li className="list-group-item"><strong>Courses: </strong>
         <ul className="list-group w-50">
          {teacher.courses.map((course)=>
                    <li className="list-group-item" key={course.id}>{course.name}</li>)}
        </ul></li>
      </ul>
      <p>Teacher Id: {id}</p> 
          <Link className=" card-link btn btn-success" to="/teachers">
        Back to Teachers
      </Link>
    </div>
 );           
};

export default Teacher;

