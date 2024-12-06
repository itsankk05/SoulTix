import React, { useState } from "react";

const FanScoreCalculator = () => {
  const [listeningHours, setListeningHours] = useState(0);
  const [topArtistHours, setTopArtistHours] = useState(0);
  const [genreCount, setGenreCount] = useState(0);
  const [fanScore, setFanScore] = useState<string | null>(null);

  // FanScore calculation function
  const calculateFanScore = (
    listeningHours: number,
    topArtistHours: number,
    genreCount: number
  ) => {
    const maxListeningHours = 2000; // Maximum expected listening hours per year
    const maxGenres = 50; // Maximum number of possible genres

    // Normalize inputs
    const listeningNorm = listeningHours / maxListeningHours;
    const topArtistNorm = topArtistHours / listeningHours; // Fraction of time on top artist
    const genreNorm = genreCount / maxGenres;

    // Weights
    const weightListening = 0.5;
    const weightTopArtist = 0.3;
    const weightGenres = 0.2;

    // Calculate FanScore
    const fanScore =
      weightListening * listeningNorm +
      weightTopArtist * topArtistNorm +
      weightGenres * genreNorm;

    // Scale to a range of 0–100
    return (fanScore * 100).toFixed(2);
  };

  const handleCalculate = () => {
    const score = calculateFanScore(
      Number(listeningHours),
      Number(topArtistHours),
      Number(genreCount)
    );
    setFanScore(score);
  };

  return (
    <div className="p-6 max-w-md mx-auto  rounded shadow-md">
      <h1 className="text-xl font-bold mb-4">FanScore Calculator</h1>
      <div className="mb-4">
        <label className="block mb-2 text-gray-700">
          Total Listening Hours:
        </label>
        <input
          type="number"
          value={listeningHours}
          onChange={(e) => setListeningHours(Number(e.target.value))}
          className="w-full p-2 border rounded text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-gray-700">
          Top Artist Listening Hours:
        </label>
        <input
          type="number"
          value={topArtistHours}
          onChange={(e) => setTopArtistHours(Number(e.target.value))}
          className="w-full p-2 border rounded text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-gray-700">
          Unique Genres Listened:
        </label>
        <input
          type="number"
          value={genreCount}
          onChange={(e) => setGenreCount(Number(e.target.value))}
          className="w-full p-2 border rounded text-black"
        />
      </div>
      <button
        onClick={handleCalculate}
        className="bg-blue-500 text-black px-4 py-2 rounded"
      >
        Calculate FanScore
      </button>

      {fanScore !== null && (
        <div className="mt-4 text-lg font-semibold">
          Your FanScore: <span className="text-green-600">{fanScore}</span>
        </div>
      )}
    </div>
  );
};

// FanScore calculation function
const calculateFanScore = (
  listeningHours: number,
  topArtistHours: number,
  genreCount: number
) => {
  const maxListeningHours = 2000; // Maximum expected listening hours per year
  const maxGenres = 50; // Maximum number of possible genres

  // Normalize inputs
  const listeningNorm = listeningHours / maxListeningHours;
  const topArtistNorm = topArtistHours / listeningHours; // Fraction of time on top artist
  const genreNorm = genreCount / maxGenres;

  // Weights
  const weightListening = 0.5;
  const weightTopArtist = 0.3;
  const weightGenres = 0.2;

  // Calculate FanScore
  const fanScore =
    weightListening * listeningNorm +
    weightTopArtist * topArtistNorm +
    weightGenres * genreNorm;

  // Scale to a range of 0–100
  return (fanScore * 100).toFixed(2);
};

export default FanScoreCalculator;
