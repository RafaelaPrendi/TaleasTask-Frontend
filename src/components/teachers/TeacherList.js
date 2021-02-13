import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory} from "react-router-dom";
import confirm from "reactstrap-confirm";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';


const TeacherList = () =>{
    const [teachers, setTeacher] = useState([]);
    let history = useHistory();

    useEffect(()=>{
        loadTeachers();
    }, []);
    const loadTeachers = async () =>{
        const result = await axios.get("http://localhost:5000/teachers");
        setTeacher(result.data.reverse());
    };
    const deleteTeacher = async id => {
       let result = await confirm({
          message: "Are you sure you want to delete this?",
        confirmText: "Delete",
        confirmColor: "danger",
        cancelColor: "link text-danger"
    });
    if(result){
       await axios.delete(`http://localhost:5000/teachers/${id}`);
        history.push("/teachers");
    }
       
    };
    return(
           <div className="container">
      <div classnamename="py-4">
        <h3 className="title">Teachers</h3>
        <Link className="btn btn-outline-info add-btn" to="/teachers/add">Add New Teacher</Link>
        <table className="table border shadow table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Subject</th>
              <th scope="col">Contact</th>
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
                <td>
                  <Link className="btn btn-outline-dark mr-2" to={`/teachers/${teacher.id}`}>
                    <VisibilityIcon/>
                  </Link>
                  <Link
                    className="btn btn-outline-info mr-2"
                    to={`/teachers/edit/${teacher.id}`}
                  >
                    <EditIcon/>
                  </Link>
                  <Link
                    className="btn btn-outline-warning"
                    onClick={() => deleteTeacher(teacher.id)}
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

export default TeacherList;