import React, { useState } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import Teacher from "./Teacher";
import Select from 'react-select';
import { Label } from "reactstrap";

const AddTeacher = () => {
    let history = useHistory();
    const [teacher, setTeacher] = useState({
        name: "",
        subject: "",
        contact:"",
        courses:[]
    });
      const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]
    const { name, subject, contact, courses} = teacher;
    const onInputChange = e =>{
        setTeacher({...teacher, [e.target.name]: e.target.value});
    };
    const onSubmit = async e =>{
       e.preventDefault();
    await axios.post("http://localhost:5000/teachers", teacher);
    history.push("/teachers"); 
    };
    return(
     <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4 title">Add A Teacher</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter the name"
              name="name"
              value={name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter the subject"
              name="subject"
              value={subject}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter the contact"
              name="contact"
              value={contact}
              onChange={e => onInputChange(e)}
            />
          </div>
          
        <div className="form-group">
            <Label>Course: </Label>
            <Select
            isMulti
            name="courses"
            className="basic-multi-select"
            classNamePrefix="select"
            options={options}/>
            {/* <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter the Courses"
              name="courses"
              value={courses}
              onChange={e => onInputChange(e)}
            /> */}
          </div>
        
          <button className="btn btn-primary btn-block">Add teacher</button>
        </form>
      </div>
    </div>   
    );
};

export default AddTeacher;