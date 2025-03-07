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
    <div className="text-stone-800">
      <h1>Recently Played tracks</h1>
      <ul>
        {recentTracks.map((item) => (
          // console.log(item.track.name)
          <li key={item.track.id}>
            {item.track.name} - {item.track.album.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentlyPlayed;
