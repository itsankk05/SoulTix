import React, { useState, useEffect } from "react";
import axios from "axios";

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
}

const TopArtists: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopArtists = async () => {
      const token = localStorage.getItem("spotifyAccessToken");

      if (!token) {
        setError("No access token found. Please connect your Spotify account.");
        return;
      }

      try {
        const response = await axios.get<{ items: Artist[] }>(
          "https://api.spotify.com/v1/me/top/artists",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setArtists(response.data.items);
      } catch (err) {
        setError("Failed to fetch top artists.");
        console.error(err);
      }
    };

    fetchTopArtists();
  }, []);

  return (
    <div className="">
      {/* <h1>Your Top Artists</h1> */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="grid grid-cols-6 gap-2">
        {artists.map((artist) => (
          <li key={artist.id}>
            <img
              src={artist.images[0]?.url || "https://via.placeholder.com/100"}
              alt={artist.name}
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
            <p>{artist.name}</p>
          </li>
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
