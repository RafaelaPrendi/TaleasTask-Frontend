import React from "react";
import { Link, NavLink } from "react-router-dom";
import {UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem} from 'reactstrap';
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" href="/">
          React School
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/contact">
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/courses">
                Courses
              </NavLink>
            </li>
               <li className="nav-item">
              <NavLink className="nav-link" exact to="/teachers">
                Teachers
              </NavLink>
            </li>
          </ul>
        </div>
   <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav>
                <button className="btn btn-outline-light" >
                  More Actions
                </button>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                <Link className="btn btn-outline-primary" to="/students/add">Add Students</Link>
                </DropdownItem>
                <DropdownItem>
                <Link className="btn btn-outline-primary" to="/courses/add">Add Courses</Link>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                <Link className="btn btn-outline-primary" to="/teachers/add">Add Teachers</Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>        
 </div>
    </nav>
  );
};

export default Navbar;
