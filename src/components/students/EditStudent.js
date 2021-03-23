import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EditStudent = () => {
  let history = useHistory();
  const { id } = useParams();
  const [student, setStudent] = useState({
    name: "",
    age: "",
    courses: []
  });
  
  useEffect(() => {
    loadStudent();
  });

  const { name, age} = student;
  const onInputChange = e => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };


  const onSubmit = async e => {
    e.preventDefault();
    await axios.put(`https://23ugwieg5e.execute-api.eu-central-1.amazonaws.com/dev/students/${id}`, student);
    history.push("/");
  };

  const loadStudent = async () => {
    const result = await axios.get(`https://23ugwieg5e.execute-api.eu-central-1.amazonaws.com/dev/students/${id}`);
    setStudent(result.data);
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4 title">Edit This Student</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Name"
              name="name"
              value={name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter Your Age"
              name="age"
              value={age}
              onChange={e => onInputChange(e)}
            />
          </div>
          {/* <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Courses"
              name="courses"
              value={courses}
              onChange={e => onInputChange(e)}
            />
          </div> */}
      
          <button className="btn btn-warning btn-block">Update Student</button>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;
