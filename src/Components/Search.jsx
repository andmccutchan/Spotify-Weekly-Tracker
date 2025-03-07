import axios from "axios";
import React, { useState, useEffect, useRef } from "react";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const queryParams = new URLSearchParams(window.location.search);
  const accessToken = queryParams.get("access_token");

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (!accessToken) {
      console.error("No token found");
      return;
    }

    const fetchSearchResults = async () => {
      if (!searchQuery.trim() || !accessToken) {
        setSearchQuery("");
        setSearchResults([]);
        return;
      }

      try {
        const queryResponse = await axios.get(
          `http://localhost:5001/search?token=${accessToken}&q=${searchQuery}`
        );

        setSearchResults(queryResponse.data.tracks.items);
      } catch (error) {
        console.error("Search failed", error);
      }
    };

    fetchSearchResults();
  }, [accessToken, searchQuery]);

  const formatTrackTime = (time) => {
    const seconds = Math.floor(time / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div>
      <input
        type="text"
        name="search-query"
        className="bg-orange-200 text-orange-700 p-6 rounded-full"
        onChange={handleChange}
        value={searchQuery}
        placeholder="Search for a song..."
      />
      <div>
        {searchResults.length > 0 ? (
          <ul className="space-y-2">
            {searchResults.map((track) => (
              <li key={track.id}>
                <div className="flex justify-between border alt-text p-2">
                  <div className="flex">
                    <img
                      src={track.album.images[0]?.url}
                      alt={track.name}
                      width="60"
                    />
                    <div className="flex flex-col mx-2">
                      <p className="text-2xl">{track.name}</p>
                      <p>
                        {track.artists.map((artist) => artist.name).join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <p>{formatTrackTime(track.duration_ms)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
