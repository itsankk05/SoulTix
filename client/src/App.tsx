import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Homepage from "./pages/Homepage";
import Discover from "./pages/Discover";
import AvailableNFT from "./pages/AvailableNFT";
import Event from "./pages/Event";
import { BackgroundBeamsWithCollision } from "./components/ui/background-beams-with-collision";

// import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { useWallet, WalletName } from "@aptos-labs/wallet-adapter-react";

import UploadPage from "./pages/UploadPage";
import Callback from "./components/Callback";
import TopArtists from "./components/TopArtists";
// import ArtistFanscore from "./pages/ArtistFanscore";

function App() {
  // const { account } = useWallet();
  const { connected, account, connect } = useWallet();

  type Account = {
    address: string;
  };

  // Function to send the wallet address to the backend
  const sendWalletAddressToBackend = async (address: string) => {
    try {
      const response = await axios.post<{ message: string }>(
        "/api/wallet-connect",
        { walletAddress: address }
      );
      console.log("Backend response:", response.data.message);
    } catch (error) {
      console.error("Error sending wallet address to backend:", error);
    }
  };

  // Use effect to detect wallet connection and send the address to the backend
  useEffect(() => {
    if (connected && account) {
      sendWalletAddressToBackend(account.address);
    }
  }, [connected, account]);

  const handleConnect = async () => {
    if (!connected) {
      connect("Petra" as WalletName<"Petra">);
    }
  };

  return (
    <div className="relative min-h-screen w-full h-full">
      <BackgroundBeamsWithCollision className="fixed inset-0 w-full h-full -z-10">
        {/* <div>{address ?? "Loading address"}</div> */}
        <div></div>
      </BackgroundBeamsWithCollision>
      <div className="relative z-10 min-h-screen w-full h-full">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/callback" element={<Callback />} />

            <Route
              path="/dashboard"
              element={account != null ? <Dashboard /> : <Navigate to="/" />}
              // element={<Dashboard />}
            />

            <Route path="/discover" element={<Discover />}></Route>
            {/* <Route path="/fanscore" element={<ArtistFanscore />}></Route> */}
            {/* <Route path="/watch" element={<Watch />}></Route> */}
            <Route path="/upload-images" element={<UploadPage />}></Route>
            <Route path="/available-nft/:id" element={<AvailableNFT />}></Route>
            <Route path="/event/:id" element={<Event />}></Route>
          </Routes>
        </Router>
        <Footer />
      </div>
    </div>
  );
}

export default App;
