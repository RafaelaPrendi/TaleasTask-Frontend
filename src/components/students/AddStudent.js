import React, { useState } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";

const AddStudent = () => {
  let history = useHistory();
  const [student, setStudent] = useState({
    name: "",
    age: "",
    courses: ""
  });

  const { name, age, courses} = student;
  const onInputChange = e => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    await axios.post("http://localhost:5000/students", student);
    history.push("/");
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A Student</h2>
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
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Courses"
              name="courses"
              value={courses}
              onChange={e => onInputChange(e)}
            />
          </div>
        
          <button className="btn btn-primary btn-block">Add Student</button>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
