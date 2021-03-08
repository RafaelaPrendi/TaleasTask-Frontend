import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";
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
const { name, subject, contact, courses} = teacher;
    const onInputChange = e =>{
        setTeacher({...teacher, [e.target.name]: e.target.value});
    };
    // load courses for select option
 const [courseList, setcourseList] = useState([]);
    useEffect(()=>{
        loadcourseList();
    }, []);

    const loadcourseList = async () =>{
      try{ 
        const result = await axios.get("https://23ugwieg5e.execute-api.eu-central-1.amazonaws.com/dev/courses/");
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
      if(!teacher.courses.includes(id)){
        teacher.courses.push(id);
      }
      console.log(teacher.courses, "teacher");
    });

}

    const onSubmit = async e =>{
       e.preventDefault();
    await axios.post("https://23ugwieg5e.execute-api.eu-central-1.amazonaws.com/dev/teachers/", teacher);
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
            options={options}
            onChange={e => addSelectedItems(e)}
            />
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