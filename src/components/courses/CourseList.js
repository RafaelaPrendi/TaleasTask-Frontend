import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import confirm from "reactstrap-confirm";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Paginator from 'react-hooks-paginator';

const CourseList = () =>{
    const [courses, setCourse] = useState([]);
    let history = useHistory();

    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const pageLimit = 3;

    useEffect(()=>{
        loadCourses();
    }, []);

      useEffect(() => {
        setCurrentData(courses.slice(offset, offset + pageLimit));
        }, [offset, courses]);

    const loadCourses = async () =>{
      try{ 
        const result = await axios.get("https://23ugwieg5e.execute-api.eu-central-1.amazonaws.com/dev/courses");
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
      await axios.delete(`https://23ugwieg5e.execute-api.eu-central-1.amazonaws.com/dev/courses${id}`);
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
              <th scope="col">Number of Students</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((course, index) => (
              <tr key={course._id}>
                <th scope="row">{index + 1}</th>
                <td>{course.name}</td>
                <td>{course.description}</td>
                <td>{course.hours}</td>
                <td>{course.students.length}</td>
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
             <Paginator
        totalRecords={courses.length}
        pageLimit={pageLimit}
        pageNeighbours={2}
        setOffset={setOffset}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pagePrevText={"Next >>"}
        pageNextText={"<< Prev "}

      />
    </div>
    );

};

export default CourseList;