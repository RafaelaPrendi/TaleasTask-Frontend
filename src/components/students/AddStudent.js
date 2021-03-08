import React, { useState, useEffect } from "react";
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

// load courses for select option
 const [courseList, setcourseList] = useState([]);
    useEffect(()=>{
        loadcourseList();
    }, []);

    const loadcourseList = async () =>{
      try{ 
        const result = await axios.get("https://23ugwieg5e.execute-api.eu-central-1.amazonaws.com/dev/courses");
        setcourseList(result.data.reverse());
      }
      catch(error){
        console.log(error);
      }
       
    }

  const options = []
  courseList.forEach(course => {
    let option = { value:course.id, label:course.name}
    options.push(option);
  });

  function addSelectedItems(event) {
    console.log(event);
    event.forEach(element => {
      let id = element.value;
      console.log(id, element.label);
      if(!student.courses.includes(id)){
        student.courses.push(id);
      }
    });

}

  const onSubmit = async e => {
    e.preventDefault();
    await axios.post("https://23ugwieg5e.execute-api.eu-central-1.amazonaws.com/dev/students", student);
    history.push("/");
  };
  console.log(courseList);
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
            onChange={e => addSelectedItems(e)}
            />
          </div>
        
          <button className="btn btn-primary btn-block">Add Student</button>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
