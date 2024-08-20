import React, { useContext } from "react";

import { TransactionContext } from "../context/TransactionContext";

import useFetch from "../hooks/useFetch";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";

const Transactions = () => {
  const { transactions, currentAccount } = useContext(TransactionContext);

  return (
    <div className="flex w-full justify-center items-center gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">
            Latest Transactions
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect your account to see the latest transactions
          </h3>
        )}

        <div className="flex flex-col items-center w-full mt-3">
          <table className="min-w-full bg-black">
            <thead>
              <tr>
                <th className="py-2 text-white">From</th>
                <th className="py-2 text-white">To</th>
                <th className="py-2 text-white">Amount</th>
                <th className="py-2 text-white">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {[...dummyData, ...transactions].reverse().map((transaction, index) => (
                <tr key={index} className="bg-black-50 border-b">
                  <td className="py-2 px-4 text-white">
                    <a href={`https://ropsten.etherscan.io/address/${transaction.addressFrom}`} target="_blank" rel="noreferrer">
                      {shortenAddress(transaction.addressFrom)}
                    </a>
                  </td>
                  <td className="py-2 px-4 text-white">
                    <a href={`https://ropsten.etherscan.io/address/${transaction.addressTo}`} target="_blank" rel="noreferrer">
                      {shortenAddress(transaction.addressTo)}
                    </a>
                  </td>
                  <td className="py-2 px-4 text-white">{transaction.amount} ETH</td>
                  <td className="py-2 px-4 text-white">{transaction.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;