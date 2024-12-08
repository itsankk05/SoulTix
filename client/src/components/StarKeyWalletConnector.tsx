import React, { useEffect, useState } from "react";
import axios from "axios";
let sharedAccount: string | null = null;
const StarkeyWalletConnector = () => {
  const [account, setAccount] = useState<string | null>(null);
  const getProvider = () => {
    if ("starkey" in window) {
      const provider = window.starkey?.supra;

      if (provider) {
        return provider;
      }
    }

    window.open("https://starkey.app/", "_blank");
  };

  const sendAccountToBackend = async (walletAddress: string) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signupAndLogin",
        {
          walletAddress: walletAddress,
        }
      );
      console.log(walletAddress);

      console.log("Backend response:", response.data);
    } catch (err) {
      console.error("Error sending account to backend:", err);
    }
  };

  useEffect(() => {
    const provider = getProvider();
    if (provider) {
      provider.on("accountChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          sharedAccount = accounts[0];
          sendAccountToBackend(accounts[0]);
        } else {
          setAccount(null);
          //   sharedAccount = null; // Update sharedAccount
        }
      });
    }
  }, []);

  const connectWallet = async () => {
    const provider = getProvider();
    if (!provider) return;

    try {
      const accounts = await provider.connect();
      setAccount(accounts[0]);
      sharedAccount = accounts[0]; // Update sharedAccount
      console.log(sharedAccount);
      sendAccountToBackend(accounts[0]);
    } catch (err) {
      const error = err as { code?: number };

      if (error.code === 4001) {
        console.error("User rejected the connection request.");
      } else {
        console.error("Failed to connect to Starkey Wallet:", err);
      }
    }
  };

  const disconnectWallet = async () => {
    const provider = getProvider();
    if (!provider) return;

    try {
      await provider.disconnect();
      setAccount(null);
      sharedAccount = null; // Update sharedAccount
    } catch (err) {
      console.error("Failed to disconnect from Starkey Wallet:", err);
    }
  };

  return (
    <div>
      <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
          {account ? (
            <div>
              <p>
                {account.slice(0, 8)}...{account.slice(-4)}
              </p>{" "}
              <button onClick={disconnectWallet}>Disconnect</button>
            </div>
          ) : (
            <button onClick={connectWallet}>Connect Wallet</button>
          )}
        </span>
      </button>
    </div>
  );
};
export { sharedAccount };
export default StarkeyWalletConnector;
