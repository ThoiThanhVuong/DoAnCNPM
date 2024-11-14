import React from "react";
import "./SignIn.css";
const SignIn = () => {
  const handleShow = () => {
    window.location.href = "/";
  };
  return (
    <div className="container-signin">
      {/* <form action="" method=""> */}
        <h1>Đăng Nhập</h1>
        <div className="form-control-signin">
          <input type="text" placeholder="Username" id="username" />
          <small></small>
          <span></span>
        </div>
        <div className="form-control-signin">
          <input type="password" placeholder="Password" id="password" />
          <small></small>
          <span></span>
        </div>
        <button className="btn-submit" onClick={handleShow}>
          Signin
        </button>
      {/* </form> */}
    </div>
  );
};
export default SignIn;
