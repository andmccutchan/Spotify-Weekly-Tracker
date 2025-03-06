import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const TrackList = () => {
  const [topTracks, setTopTracks] = useState([]);
  const queryParams = new URLSearchParams(window.location.search);
  const accessToken = queryParams.get("access_token");

  useEffect(() => {
    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    console.log("Access Token:", accessToken); // Debugging

    axios
      .get(`http://localhost:5001/top-tracks?token=${accessToken}`)
      .then((response) => {
        console.log("API Response:", response.data); // Debugging
        setTopTracks(response.data.items); // FIXED: Should be `items`
      })
      .catch((error) => console.error("Error fetching top tracks:", error));
  }, [accessToken]);
  return (
    <div>
      <h1>Your Top Tracks</h1>
      {topTracks.length > 0 ? (
        <ul>
          {topTracks.map((track) => (
            <li key={track.id}>
              {track.name} -{" "}
              {track.artists.map((artist) => artist.name).join(", ")}
              <img
                src={track.album.images[0].url}
                alt={track.album.name}
                width="100"
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading or No tracks found</p> // Improve feedback
      )}
    </div>
  );
};

export default TrackList;
