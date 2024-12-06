import React, { useState, useEffect } from "react";
import axios from "axios";

interface ArtistFanscore {
  artist: string;
  fanscore: number;
  totalListeningTime: number; // in minutes
}

const ArtistFanscore = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [fanscores, setFanscores] = useState<ArtistFanscore[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Replace these with your Spotify credentials
  const CLIENT_ID = "552366a516f2483caccc7e19b23cb67a";
  const REDIRECT_URI = "http://localhost:3000/callback"; // Must match Spotify's Redirect URI
  const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=user-read-recently-played`;

  const fetchRecentlyPlayed = async () => {
    if (!accessToken) return;

    try {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/recently-played",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            limit: 50, // Max tracks Spotify allows
          },
        }
      );

      const items = response.data.items;

      // Group data by artist
      const artistData: Record<string, number> = {}; // artist -> total duration_ms

      let totalListeningTime = 0; // in milliseconds

      items.forEach((item: any) => {
        const duration = item.track.duration_ms;
        const artistName = item.track.artists[0].name; // First artist listed
        totalListeningTime += duration;

        if (artistName in artistData) {
          artistData[artistName] += duration;
        } else {
          artistData[artistName] = duration;
        }
      });

      // Calculate fanscores
      const fanscoreData: ArtistFanscore[] = Object.entries(artistData).map(
        ([artist, durationMs]) => ({
          artist,
          totalListeningTime: durationMs / (1000 * 60), // Convert ms to minutes
          fanscore: (durationMs / totalListeningTime) * 100, // Calculate fanscore percentage
        })
      );

      // Sort by fanscore descending
      fanscoreData.sort((a, b) => b.fanscore - a.fanscore);

      setFanscores(fanscoreData);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch recently played tracks. Please try again.");
    }
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = new URLSearchParams(hash.substring(1)).get("access_token");
      if (token) {
        setAccessToken(token);
        window.location.hash = ""; // Clear token from URL for security
      }
    }
  }, []);

  return (
    <div className="artist-fanscore p-20">
      {!accessToken ? (
        <div className="auth-button">
          <a
            href={SPOTIFY_AUTH_URL}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Connect to Spotify
          </a>
        </div>
      ) : (
        <div className="data-section">
          <button
            onClick={fetchRecentlyPlayed}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Calculate Artist Fanscores
          </button>
          {fanscores.length > 0 && (
            <div className="mt-4">
              <h2 className="text-xl font-bold">Artist Fanscores:</h2>
              <ul className="list-disc ml-6">
                {fanscores.map((data, index) => (
                  <li key={index} className="mt-2">
                    <span className="font-bold">{data.artist}</span>:{" "}
                    <span>{data.fanscore.toFixed(2)}%</span> (
                    {data.totalListeningTime.toFixed(2)} minutes)
                  </li>
                ))}
              </ul>
            </div>
          )}
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default ArtistFanscore;
