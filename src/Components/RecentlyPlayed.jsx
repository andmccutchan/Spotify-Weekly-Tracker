import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const RecentlyPlayed = () => {
  const [recentTracks, setRecentTracks] = useState([]);
  const queryParams = new URLSearchParams(window.location.search);
  const accessToken = queryParams.get("access_token");

  useEffect(() => {
    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    const fetchRecentTracks = async () => {
      const tracksResponse = await axios.get(
        `http://localhost:5001/recently-played-tracks?token=${accessToken}`
      );

      setRecentTracks(tracksResponse.data.items);
    };
    fetchRecentTracks();
  }, [accessToken]);

  return (
    <div>
      <ul>
        {recentTracks.map((item) => (
          <li key={item.track.id}>{item.track.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecentlyPlayed;
