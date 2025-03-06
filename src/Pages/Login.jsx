import React from "react";

const Login = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:5001/login";
  };
  return (
    <div>
      <h1>Spotify OAuth</h1>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
};

export default Login;
