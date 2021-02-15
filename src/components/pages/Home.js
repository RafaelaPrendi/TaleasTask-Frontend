import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import confirm from "reactstrap-confirm";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ReactPaginate from 'react-paginate';

const Home = () => {
  const [students, setStudent] = useState([]);
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    loadStudents();
  }, [offset]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1)
};

  const loadStudents = async () => {
    const result = await axios.get("http://localhost:5000/students");
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
      await axios.delete(`http://localhost:5000/students/${id}`);
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <th scope="row">{index + 1}</th>
                <td>{student.name}</td>
                <td>{student.age}</td>
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
             <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
    </div>
  );
};

export default Home;
