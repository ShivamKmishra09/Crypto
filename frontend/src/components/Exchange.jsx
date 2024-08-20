import React, { useContext, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { Loader } from ".";

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const Exchange = () => {
  const {
    currentAccount,
    connectWallet,
    handleChange,
    sendTransaction,
    formData,
    isLoading,
    addToken,
    fetchTokenBalance,
    token,
    tokenAddresslist,
    setTokenAddress,
    tokenDetailsList,
    tokenBalance,
    setToken,
  } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;

    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };

  const handleAddToken = (e) => {
    const { tokenAddress } = token;
    e.preventDefault();
    if (!tokenAddress) return;
    addToken();
  };

  const handleFetchTokenBalance = () => {
    fetchTokenBalance();
  };

  return (
    <div className="flex w-full justify-center items-center gradient-bg-welcome min-h-screen">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
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
            <>
              <h1 className="text-white text-3xl text-center my-2">
                Send Crypto
              </h1>
              <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
                <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
                <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />
                <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />

                <div className="h-[1px] w-full bg-gray-400 my-2" />

                {isLoading ? (
                  <Loader />
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                  >
                    Send now
                  </button>
                )}
              </div>
              {/* <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism mt-5">
                <Input
                  placeholder="Token Address"
                  name="tokenAddress"
                  type="text"
                  handleChange={handleChange}
                />
                <button
                  type="button"
                  onClick={handleAddToken}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                >
                  Add Token
                </button>
                <button
                  type="button"
                  onClick={handleFetchTokenBalance}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                >
                  Fetch Token Balance
                </button>
                {tokenDetailsList.map((token) => (
                  <div key={token.address} className="mt-4 p-2 border border-gray-400 rounded">
                    <p><strong>Address:</strong> {tokenAddresslist[token]}</p>
                    <p><strong>Name:</strong> {token.name}</p>
                    <p><strong>Symbol:</strong> {token.symbol}</p>
                    <p><strong>Balance:</strong> {tokenBalance[token]}</p>
                  </div>
                ))}
              </div> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Exchange;