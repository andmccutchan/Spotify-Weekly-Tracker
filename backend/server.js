import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import querystring from "querystring";

dotenv.config();

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// Redirect user to Spotify login
app.get("/login", (req, res) => {
  const scope = "user-top-read user-read-recently-played"; // FIXED scope name

  const authUrl = `https://accounts.spotify.com/authorize?${querystring.stringify(
    {
      client_id: process.env.CLIENT_ID,
      response_type: "code",
      redirect_uri: process.env.REDIRECT_URI,
      scope: scope,
      state: "random_state",
    }
  )}`;
  res.redirect(authUrl);
});

// Handle callback from Spotify after user logs in
app.get("/callback", async (req, res) => {
  const code = req.query.code || null;

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { access_token, refresh_token } = response.data;

    res.redirect(
      `${process.env.FRONTEND_URI}/dashboard?access_token=${access_token}&refresh_token=${refresh_token}`
    );
  } catch (error) {
    console.error(
      "Error exchanging code:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to get access token" }); // FIXED response
  }
});

// Fetch user's top tracks
app.get("/top-tracks", async (req, res) => {
  const accessToken = req.query.token;

  if (!accessToken) {
    return res.status(400).json({ error: "Missing access token" });
  }

  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks?time_range=short_term",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching top tracks:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to fetch top tracks" });
  }
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
