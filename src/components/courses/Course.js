import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Course = () => {
const [course, setCourse] = useState({
        name: "",
        description:"",
        hours: "",
        students:[]
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
      <div className="container py-4 card">
      <ul className="list-group w-50 card-body" key={course.id}>
        <h5 className="card-title">Course's Details</h5>
        <li className="list-group-item"><strong>Name: </strong>{course.name}</li>
        <li className="list-group-item"><strong>Description: </strong> {course.description}</li>
        <li className="list-group-item"><strong>Hours: </strong> {course.hours}</li>
        <li className="list-group-item"><strong>Number of students: </strong> {course.students.length}</li>
        <li className="list-group-item"><strong>Students:</strong> 
        <ul className="list-group w-50">
           {course.students.map((student)=>
                    <li className="list-group-item" key={student.id}>{student.name}</li>)}     
        </ul></li>
      </ul>
      <p>Course Id: {id}</p>
       <Link className="card-link btn btn-success" to="/courses">
        Back to Courses
      </Link>
    </div>  
    );   
};

export default Course;