import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Navbar from "./components/layout/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import NotFound from "./components/pages/NotFound";
import AddStudent from "./components/students/AddStudent";
import Student from "./components/students/Student";
import EditStudent from "./components/students/EditStudent";

import Course from './components/courses/Course';
import CourseList from './components/courses/CourseList';
import AddCourse from './components/courses/AddCourse';
import EditCourse from './components/courses/EditCourse';

import AddTeacher from './components/teachers/AddTeacher';
import EditTeacher from './components/teachers/EditTeacher';
import Teacher from './components/teachers/Teacher';
import TeacherList from './components/teachers/TeacherList';

function App(props) {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/taleas" component={()=> (<h1> new student</h1>)} />
          <Route exact path="/contact" component={Contact} />

          <Route exact path="/students/add" component={AddStudent} />
          <Route exact path="/students/edit/:id" component={EditStudent} />
          <Route exact path="/students/:id" component={Student} />
          
          <Route exact path="/courses/add" component={AddCourse} />
          <Route exact path="/courses/edit/:id" component={EditCourse} />
          <Route exact path="/courses/:id" component={Course} />
          <Route exact path="/courses" component={CourseList} />

          <Route exact path="/teachers/edit/:id" component={EditTeacher} />
          <Route exact path="/teachers/:id" component={Teacher} />
          <Route exact path="/teachers" component={TeacherList} />
          <Route exact path="/teachers/add" component={AddTeacher} /> 

          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
