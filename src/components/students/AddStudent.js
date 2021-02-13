import React, { useState } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import Select from 'react-select';



const AddStudent = () => {
  let history = useHistory();
  const [student, setStudent] = useState({
    name: "",
    age: "",
    courses: []
  });

  const { name, age, courses} = student;
  const onInputChange = e => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };
  const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]
  const onSubmit = async e => {
    e.preventDefault();
    await axios.post("http://localhost:5000/students", student);
    history.push("/");
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4 title">Add A Student</h2>
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
            <label>Course:</label>
            <Select
            isMulti
            name="courses"
            className="basic-multi-select"
            classNamePrefix="select"
            options={options}
            // onChange={e => onInputChange(e)}
            />
            {/* <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Courses"
              name="courses"
              value={courses}
              onChange={e => onInputChange(e)}
            /> */}
          </div>
        
          <button className="btn btn-primary btn-block">Add Student</button>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
