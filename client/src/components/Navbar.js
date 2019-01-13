import React from "react";

const Navbar = props => (
  <ul id="navbar">
    <li className="navBtn" onClick={props.viewAccount}>
      <a>Account</a>
    </li>
    <li className="navBtn" onClick={props.viewHome}>
      <a className="active">Home</a>
    </li>
    <li className="navBtn" onClick={props.viewHistory}>
      <a>History</a>
    </li>
  </ul>
);

export default Navbar;
