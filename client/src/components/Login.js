import React from "react";

const Login = props => (
  <div className="login withBackground">
    <form className='login-form'>
      <input className="align-center" onChange={props.changeUid} placeholder="Enter mobile phone #" />
      <p className="white-text">demo use: 404123567</p>
      <br />
      <input className="align-center" type="password" onChange={props.changePw} placeholder="Enter password" />
      <p className="white-text">demo use: password</p>
      <br />
      <button className="login-button" id='login-button' onClick={props.submitLogin}>Submit</button>
    </form>
  </div>
);

export default Login;
