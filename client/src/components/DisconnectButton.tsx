import React from "react";
import spotify from "../images/spotifylogo-removebg-preview.png";

interface DisconnectButtonProps {
  onDisconnect?: () => void; // Optional callback function
}

const DisconnectButton: React.FC<DisconnectButtonProps> = ({
  onDisconnect,
}) => {
  const handleDisconnect = () => {
    // Remove the access token from localStorage
    localStorage.removeItem("spotifyAccessToken");

    // Optional: Trigger a callback after disconnect
    if (onDisconnect) {
      onDisconnect();
    }

    alert("You have been disconnected from Spotify.");
    console.log("Spotify access token removed.");
  };

  return (
    <button
      className="flex items-center gap-2 bg-[#1DB954] hover:bg-[#1ed760] text-white px-4 py-2 rounded-full transition-all duration-200 font-medium"
      onClick={handleDisconnect}
    >
      <img src={spotify} alt="Spotify" className="w-6 h-6 object-contain" />
      Connected
    </button>
  );
};

export default DisconnectButton;
