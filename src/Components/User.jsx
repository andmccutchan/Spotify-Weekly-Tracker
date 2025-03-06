import React, { useEffect, useState } from "react";
import axios from "axios";

const User = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const accessToken = queryParams.get("access_token");
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const profileResponse = await axios.get(
        `http://localhost:5001/user-profile?token=${accessToken}`
      );
      // console.log(response.data);
      setUserInfo(profileResponse.data);
    };

    fetchUserProfile();
  }, [accessToken]);
  return (
    <div className="bg-stone-200 text-stone-800 min-h-screen">
      <h1>{userInfo.display_name}</h1>
    </div>
  );
};

export default User;
