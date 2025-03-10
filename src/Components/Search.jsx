import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchType, setSearchType] = useState("track");

  const queryParams = new URLSearchParams(window.location.search);
  const accessToken = queryParams.get("access_token");

  // Debounce the search query to prevent excessive API calls

  const handleTextChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const debouncedSearch = debounce(handleTextChange, 300);

  const handleSelectChange = (e) => {
    setSearchType(e.target.value);
  };

  useEffect(() => {
    setSearchResults([]);

    if (!accessToken) {
      console.error("No token found");
      return;
    }

    const fetchSearchResults = async () => {
      if (!searchQuery.trim()) return;

      try {
        const queryResponse = await axios.get(
          `http://localhost:5001/search?token=${accessToken}&q=${searchQuery}&type=${searchType}`
        );

        if (queryResponse.data[searchType]?.items) {
          setSearchResults(queryResponse.data[searchType].items);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Search failed", error);
      }
    };

    fetchSearchResults();
  }, [searchQuery, searchType, accessToken]);

  // Format track duration
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
        className="bg-orange-200 text-orange-700 p-6 rounded-full"
        onChange={handleTextChange}
        placeholder="Search..."
      />
      <select onChange={handleSelectChange} value={searchType}>
        <option value="track">Track</option>
        <option value="artist">Artist</option>
        <option value="album">Album</option>
        <option value="playlist">Playlist</option>
        <option value="show">Show</option>
        <option value="episode">Episode</option>
        <option value="audiobook">Audiobook</option>
      </select>
      <div>
        {searchResults.length > 0 ? (
          <ul className="space-y-2">
            {searchResults.map((item) => (
              <li key={item.id}>
                <div className="flex justify-between border p-2">
                  <div className="flex">
                    {item.album?.images?.[0]?.url && (
                      <img
                        src={item.album.images[0].url}
                        alt={item.name}
                        width="60"
                      />
                    )}
                    <div className="flex flex-col mx-2">
                      <p className="text-2xl">{item.name}</p>
                      {item.artists && (
                        <p>
                          {item.artists.map((artist) => artist.name).join(", ")}
                        </p>
                      )}
                    </div>
                  </div>
                  {item.duration_ms && (
                    <div className="flex justify-center items-center">
                      <p>{formatTrackTime(item.duration_ms)}</p>
                    </div>
                  )}
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
