import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import confirm from "reactstrap-confirm";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Paginator from 'react-hooks-paginator';

const Home = () => {
  const [students, setStudent] = useState([]);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const pageLimit = 3;

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
   setCurrentData(students.slice(offset, offset + pageLimit));
  }, [offset, students]);

    const loadStudents = async () => {
    const result = await axios.get("https://iblxzll8p9.execute-api.eu-central-1.amazonaws.com/dev/students/");
    setStudent(result.data.reverse());

  };
  

  const deleteStudent = async id => {
    let result = await confirm({
      message: "Are you sure you want to delete this?",
    confirmText: "Delete",
    confirmColor: "danger",
    cancelColor: "link text-danger"
    });
    if(result){
      await axios.delete(`https://iblxzll8p9.execute-api.eu-central-1.amazonaws.com/dev/students/${id}`);
    loadStudents();
    }
  };

  return (
    <div className="container">
      <div classnamename="py-4">
        <h3 className="title">Students</h3>
        <Link className="btn btn-outline-info add-btn" to="/students/add">Add New Student</Link>
        <table className="table border shadow table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
               <th scope="col">Number of courses</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((student, index) => (
              <tr key={student._id}>
                <th scope="row">{index + 1}</th>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.courses.length}</td>
                <td>
                  <Link className="btn btn-outline-dark mr-2" to={`/students/${student.id}`}>
            <VisibilityIcon />
                  </Link>
                  <Link
                    className="btn btn-outline-info mr-2"
                    to={`/students/edit/${student.id}`}
                  >
                    <EditIcon/>
                  </Link>
                  <Link
                    className="btn btn-outline-warning"
                    onClick={() => deleteStudent(student.id)}
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
        totalRecords={students.length}
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

export default Home;
