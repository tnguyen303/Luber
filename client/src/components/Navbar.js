import React from "react";

const Navbar = props => (
  <ul id="navbar">
    <li className="navBtn" onClick={props.viewAccount}>
      <a href='#'>Account</a>
    </li>
    <li className="navBtn" onClick={props.viewHome}>
      <a href='#' className="active">Home</a>
    </li>
    <li className="navBtn" onClick={props.viewHistory}>
      <a href='#'>History</a>
    </li>
  </ul>
);

export default Navbar;
