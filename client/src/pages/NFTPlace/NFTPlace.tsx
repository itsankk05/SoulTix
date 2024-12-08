import React from "react";

const NFTCard: React.FC = () => {
  return (
    <div className="relative w-80 p-4 rounded-xl bg-[#282c34] border border-gray-700 shadow-lg shadow-black/60 transition-transform duration-500 hover:scale-105">
      {/* Image Section */}
      <img
        className="w-full h-64 object-cover rounded-lg"
        src="https://images.unsplash.com/photo-1621075160523-b936ad96132a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        alt="NFT"
      />

      {/* NFT Title */}
      <h2 className="text-xl font-bold text-white mt-4">Kibertopiks #4269</h2>

      {/* NFT Description */}
      <p className="text-gray-400 text-sm mt-2">
        Our Kibertopiks will give you nothing, waste your money on us.
      </p>

      {/* Token Info */}
      <div className="flex justify-between items-center text-sm mt-4">
        <div className="flex items-center text-pink-400 font-semibold">
          <span className="mr-2">◘</span>
          <p>0.031 ETH</p>
        </div>
        <div className="flex items-center text-gray-400">
          <span className="mr-2">◷</span>
          <p>11 days left</p>
        </div>
      </div>

      {/* Horizontal Line */}
      <hr className="border-gray-600 my-4" />

      {/* Creator Info */}
      <div className="flex items-center">
        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-700 shadow-inner mr-3">
          <img
            className="w-8 h-8 rounded-full"
            src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
            alt="Creator"
          />
        </div>
        <p className="text-gray-400">
          <span className="text-sm text-gray-500">Creation of</span>{" "}
          <span className="text-white font-semibold">Kiberbash</span>
        </p>
      </div>
    </div>
  );
};

const NFTGrid: React.FC = () => {
  return (
    <div className="min-h-screen  flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Render 4 NFT Cards */}
        <NFTCard />
        <NFTCard />
        <NFTCard />
        <NFTCard />
      </div>
    </div>
  );
};

export default NFTGrid;
