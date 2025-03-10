import React from "react";

const LoginCard = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:5001/login";
  };
  return (
    <div className="">
      <h1 className="text-6xl">Spotify OAuth</h1>
      <button
        className="bg-amber-700 rounded text-amber-400 p-5"
        onClick={handleLogin}
      >
        Login with Spotify
      </button>
    </div>
  );
};

export default LoginCard;
