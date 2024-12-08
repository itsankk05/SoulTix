// import { useState } from "react";
// import OTVTOKENABI from "../abis/NFTContract.js";
// import constants from "../helper/constants.js";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import axios from "axios";
// import spotify from "../images/spotifylogo-removebg-preview.png";
import apple from "../images/aaa-removebg-preview.png";
import yt from "../images/ytmusic1.png";
import FanScoreCalculator from "../components/FanScoreCalculator";
import GaugeChart from "../components/animata/gauge-chart";
import art3 from "../images/art3.jpg";
import ConnectButton from "../components/ConnectButton";
import TopArtists from "../components/TopArtists";
import Profile from "../components/animata/widget/Profile";

export default function Dashboard() {
  const { connected, account, connect } = useWallet();
  const [accountAddress, setAccountAddress] = useState("");
  //

  useEffect(() => {
    if (connected && account) {
      setAccountAddress(account.address); // Fetch the user's account address
    }
  }, [connected, account]);

  const imageItems = [
    {
      id: 1,
      title: "Artist 1",
      coverUrl: { art3 },
      imageUrls: [
        { art3 },
        "https://slwehdbwpcxuqrwxmwqq.supabase.co/storage/v1/object/public/nft-images/haki-1024x341.jpg.webp",
      ],
      description:
        "Collaborate in realtime with other editors in a project. See what other editors are doing and edit even a simple text together",
    },
  ];

  return (
    <div>
      <section className="py-12 text-gray-100 sm:py-12 lg:py-16 ">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center xl:max-w-2xl">
            <h2 className="text-3xl font-bold leading-tight text-gray-50 sm:text-4xl xl:text-5xl mb-6 my-10">
              Profile
            </h2>
          </div>
          {/* <hr /> */}
          <br />
          {/* user profile */}
          <div className="flex items-center justify-center gap-4">
            <Profile />
            <div className="flex  bg-[#27272a] w-[210px] h-[210px] rounded-3xl justify-center items-center">
              <div className="flex flex-col  gap-4">
                <ConnectButton />
                <button className="flex items-center gap-2 bg-gradient-to-r from-[#FB5C74] to-[#FA233B] hover:from-[#FA233B] hover:to-[#FB5C74] text-white px-4 py-2 rounded-full transition-all duration-200 font-medium">
                  <img
                    src={apple}
                    alt="Apple Music"
                    className="w-6 h-6 object-contain"
                  />
                  <span>Apple Music</span>
                </button>
                <button className="flex items-center gap-2 bg-[#FF0000] hover:bg-red-600 text-white px-4 py-2 rounded-full transition-all duration-200 font-medium">
                  <img
                    src={yt}
                    alt="YT Music"
                    className="w-6 h-6 object-contain"
                  />
                  <span>YouTube Music</span>
                </button>
              </div>
            </div>
          </div>
          <br />
          <hr />
          <br />
          <div className="flex flex-col items-center justify-center space-y-2 text-3xl">
            Your Top Artists
          </div>
          {/* <div className="grid max-w-4xl lg:max-w-6xl grid-cols-1 mx-auto mt-8 text-center gap-y-4 sm:gap-x-8 sm:grid-cols-2 lg:grid-cols-3 sm:mt-12 lg:mt-20 sm:text-left">
            {imageItems.map((item, index) => (
              <Link key={index} to={`/available-nft/${item.id}`}>
                <div
                  className="relative overflow-hidden bg-white shadow-md rounded-xl p-9 transition duration-300 ease-in-out hover:bg-white-300 hover:scale-110"
                  style={{
                    backgroundImage: `url(${item.coverUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "300px",
                    width: "300px",
                  }}
                >
                  <div className="p-9 bg-opacity-75"></div>
                  <p className="opacity-0 hover:opacity-100 duration-300 absolute inset-0  flex justify-center items-center">
                    {item.title}
                  </p>
                </div>
              </Link>
            ))}
          </div> */}
          <TopArtists />
        </div>
      </section>
    </div>
  );
}
