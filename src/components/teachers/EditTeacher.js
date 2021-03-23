import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EditTeacher = () =>{
  let history = useHistory();
  const { id } = useParams();
  const [teacher, setTeacher] = useState({
        name: "",
        subject: "",
        contact:"",
        courses:[]
    });
    const { name, subject, contact} = teacher;
    const onInputChange = e =>{
        setTeacher({...teacher, [e.target.name]: e.target.value});
    };
    useEffect(() =>{
        loadTeacher();
    });

    const loadTeacher = async () => {
        const result = await axios.get(`https://23ugwieg5e.execute-api.eu-central-1.amazonaws.com/dev/teachers/${id}`);
        setTeacher(result.data);
  };

     const onSubmit = async e =>{
        e.preventDefault();
        await axios.put(`https://23ugwieg5e.execute-api.eu-central-1.amazonaws.com/dev/teachers/${id}`, teacher);
         history.push("/"); 
    };
    return(
        <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4 title">Edit This Teacher</h2>
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
          {/* <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter the Courses"
              name="courses"
              value={courses}
              onChange={e => onInputChange(e)}
            />
          </div> */}
        
          <button className="btn btn-primary btn-block">Update teacher</button>
        </form>
      </div>
    </div>   
    );

};

export default EditTeacher;