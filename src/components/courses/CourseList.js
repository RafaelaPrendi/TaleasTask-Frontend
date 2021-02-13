import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import confirm from "reactstrap-confirm";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';


const CourseList = () =>{
    const [courses, setCourse] = useState([]);
    let history = useHistory();

    useEffect(()=>{
        loadCourses();
    }, []);

    const loadCourses = async () =>{
      try{ 
        const result = await axios.get("http://localhost:5000/courses");
        setCourse(result.data.reverse());
      }
      catch(error){
        console.log(error);
      }
       
    }
    const deleteCourse = async id =>{
       let result = await confirm({
            message: "Are you sure you want to delete this?",
          confirmText: "Delete",
          confirmColor: "danger",
          cancelColor: "link text-danger"
    });
    if(result){
      await axios.delete(`http://localhost:5000/courses/${id}`);
        loadCourses();
        history.push("/courses");
    }
        
    };

    return(
<div className="container">
      <div classnamename="py-4">
        <h3 className="title">Courses</h3>
         <Link className="btn btn-outline-info add-btn" to="/courses/add">Add New Course</Link>
        <table className="table border shadow table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Hours</th>
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
                <td>
                  <Link className="btn btn-outline-dark mr-2" to={`/courses/${course.id}`}>
                    <VisibilityIcon/>
                  </Link>
                  <Link
                    className="btn btn-outline-info mr-2"
                    to={`/courses/edit/${course.id}`}
                  >
                   <EditIcon/>
                  </Link>
                  <Link
                    className="btn btn-outline-warning"
                    onClick={() => deleteCourse(course.id)}
                  >
                    <DeleteOutlineIcon/>
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