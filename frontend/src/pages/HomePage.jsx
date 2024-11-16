import React from "react";
import Cookies from "js-cookie";
const HomePage = () => {
  const handleBackToLogin = () => {
    Cookies.remove("token");
    window.location.reload();
  };
  return (
    <div>
      <button onClick={handleBackToLogin}>back to login</button>
      <h1>trang HomePage</h1>
    </div>
  );
};
export default HomePage;
