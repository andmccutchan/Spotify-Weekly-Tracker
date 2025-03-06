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

    axios
      .get(`http://localhost:5001/top-tracks?token=${accessToken}`)
      .then((response) => {
        console.log("API Response:", response.data); // Debugging
        setTopTracks(response.data.items); // FIXED: Should be `items`
      })
      .catch((error) => console.error("Error fetching top tracks:", error));
  }, [accessToken]);

  return (
    <div className="w-1/4">
      <h1>Your Top Tracks</h1>
      {topTracks.length > 0 ? (
        <ul className="space-y-4">
          {topTracks.map((track) => (
            <li
              key={track.id}
              className="bg-orange-600 border-3 border-amber-700 rounded-r-full p-3 flex text-stone-800"
            >
              <img
                src={track.album.images[0].url}
                alt={track.album.name}
                width="100"
                className="rounded-full"
              />
              <div className="flex flex-col justify-center ms-4">
                <h2 className="text-3xl">{track.name}</h2>
                <p className="text-2xl">
                  {track.artists.map((artist) => artist.name).join(", ")} -{" "}
                  {track.album.name}
                </p>
              </div>
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
