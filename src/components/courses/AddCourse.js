import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import Select from 'react-select';
import { Label } from "reactstrap";

const AddCourse = () => {
    let history = useHistory();
    const [course, setCourse] = useState({
        name: "",
        description:"",
        hours: "",
        students:[]
    });

    const {name, description, hours, students} = course;
    const onInputChange = e =>{
        setCourse({...course, [e.target.name]: e.target.value});
    };

    // load students for select options
       const options = []
        const [studentList, setstudentList] = useState([]);
         useEffect(() => {
          loadStudentList();}, []);
         const loadStudentList = async () => {
      const result = await axios.get("https://23ugwieg5e.execute-api.eu-central-1.amazonaws.com/dev/students/");
      setstudentList(result.data.reverse());
  };

   studentList.forEach(student => {
    let option = { value:student.id, label:student.name}
    options.push(option);
  });

   function addSelectedItems(event) {
    console.log(event);
    event.forEach(element => {
      let id = element.value;
      console.log(id, element.label);
      if(!course.students.includes(id)){
        course.students.push(id);
      }
    });

}

    const onSubmit = async e => {
        e.preventDefault();
        console.log(course);
        await axios.post("https://23ugwieg5e.execute-api.eu-central-1.amazonaws.com/dev/courses/", course);
        history.push("/courses");
    };

    return(
  <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4 title">Add A Course</h2>
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
              placeholder="Enter the description"
              name="description"
              value={description}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter number of hours"
              name="hours"
              value={hours}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <Label>Student: </Label>
              <Select
            isMulti
            name="students"
            className="basic-multi-select"
            classNamePrefix="select"
            options={options}
            onChange={e => addSelectedItems(e)}/>
          </div>
        
          <button className="btn btn-primary btn-block">Add Course</button>
        </form>
      </div>
    </div>  
);
};


export default AddCourse;