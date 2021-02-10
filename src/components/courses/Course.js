import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Course = () => {
const [course, setCourse] = useState({
        name: "",
        description:"",
        hours: "",
        students:""
    });
const { id } = useParams();
useEffect(() =>{
        loadCourse();
    }, []);
  const loadCourse = async () =>{
         const result = await axios.get(`http://localhost:5000/courses/${id}`);
         setCourse(result.data); 
    };
    return(
      <div className="container py-4">
      <Link className="btn btn-primary" to="/">
        back to Home
      </Link>
      <h1 className="display-4">Course Id: {id}</h1>
      <hr />
      <ul className="list-group w-50" key={course.id}>
        <li className="list-group-item">name: {course.name}</li>
        <li className="list-group-item">Description: {course.description}</li>
        <li className="list-group-item">Hours: {course.hours}</li>
        <li className="list-group-item">Students: {course.students}</li>
      </ul>
    </div>  
    );   
};

export default Course;