import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const CourseList = () =>{
    const [courses, setCourse] = useState([]);
    let history = useHistory();

    useEffect(()=>{
        loadCourses();
    }, []);

    const loadCourses = async () =>{
      try{ 
        const result = await axios.get("https://localhost:5000/courses");
        console.log(result);
        setCourse(result.data.reverse());
      }
      catch(error){
        console.log(error);
      }
       
    }
    const deleteCourse = async id =>{
        await axios.delete(`https://localhost:5000/courses/${id}`);
        loadCourses();
        history.push("/courses");
    };

    return(
<div className="container">
      <div classnamename="py-4">
        <h3>Courses list</h3>
        <table className="table border shadow">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Hours</th>
              <th scope="col">Students</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={course.id}>
                <th scope="row">{index + 1}</th>
                <td>{course.name}</td>
                <td>{course.description}</td>
                <td>{course.hours}</td>
                <td>{course.students}</td>
                <td>
                  <Link className="btn btn-primary mr-2" to={`/courses/${course.id}`}>
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mr-2"
                    to={`/courses/edit/${course.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    className="btn btn-danger"
                    onClick={() => deleteCourse(course.id)}
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

export default CourseList;