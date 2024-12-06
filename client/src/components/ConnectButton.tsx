import React from "react";
import spotify from "../images/spotifylogo-removebg-preview.png";
const ConnectButton = () => {
  const handleLogin = () => {
    const clientId = "552366a516f2483caccc7e19b23cb67a";
    const redirectUri = "http://localhost:3000/callback";
    const scopes = ["user-top-read", "user-read-private", "user-read-email"];
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scopes.join(" "))}`;

    window.location.href = authUrl; // Redirects to Spotify login
  };

  return (
    <button
      className="flex items-center gap-2 bg-[#1DB954] hover:bg-[#1ed760] text-white px-4 py-2 rounded-full transition-all duration-200 font-medium"
      onClick={handleLogin}
    >
      <img src={spotify} alt="Spotify" className="w-6 h-6 object-contain" />{" "}
      Spotify
    </button>
  );
};

export default ConnectButton;
