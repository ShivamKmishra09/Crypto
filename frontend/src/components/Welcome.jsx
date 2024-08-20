import React, { useContext, useState, useEffect } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { ethers } from "ethers";
import { TransactionContext } from "../context/TransactionContext";

const Welcome = () => {
  const { currentAccount, connectWallet } = useContext(TransactionContext);
  const [accountBalance, setAccountBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      if (currentAccount) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(currentAccount);
        setAccountBalance(ethers.utils.formatEther(balance));
      }
    };

    fetchBalance();
  }, [currentAccount]);

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Send Crypto <br /> across the world
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Explore the crypto world. Buy and sell cryptocurrencies easily on Krypto.
          </p>
          {!currentAccount ? (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <AiFillPlayCircle className="text-white mr-2" />
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          ) : (
            <div className="mt-5">
              <h4 className="text-white text-base font-semibold">
                Account Balance: {accountBalance} ETH
              </h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Welcome;