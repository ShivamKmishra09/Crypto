import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

  return transactionsContract;
};

export const TransactionsProvider = ({ children }) => {
  const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  const [transactions, setTransactions] = useState([]);
  const [token, setToken] = useState("");
  const [tokenAddresslist, setTokenAddresslist] = useState([]);
  const [tokenBalanceList, setTokenBalanceList] = useState([]);
  const [tokenCount, setTokenCount] = useState(0);
  const [tokenDetailsList, setTokenDetailsList] = useState([]);


  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getAllTransactions = async () => {
    try {
      if (!ethereum) {
        throw new Error("No ethereum object");
      }
        const transactionsContract = createEthereumContract();

        const availableTransactions = await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map((transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / (10 ** 18)
        }));

        console.log(structuredTransactions);

        setTransactions(structuredTransactions);
      
    } catch (error) {
      console.log(error);
    }
  };



  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllTransactions();
        getTokenAddresses();
        fetchAllTokenBalances();

      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfTransactionsExists = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");
        const transactionsContract = createEthereumContract();
        const currentTransactionCount = await transactionsContract.getTransactionCount();

        window.localStorage.setItem("transactionCount", currentTransactionCount);
      
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts", });

      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const sendTransaction = async () => {
    try {
      if (ethereum) {
        const { addressTo, amount, keyword, message } = formData;
        const transactionsContract = createEthereumContract();
        const parsedAmount = ethers.utils.parseEther(amount);

        await ethereum.request({
          method: "eth_sendTransaction",
          params: [{
            from: currentAccount,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount._hex,
          }],
        });

        const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        const transactionsCount = await transactionsContract.getTransactionCount();

        setTransactionCount(transactionsCount.toNumber());
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };
  const addToken = async () => {

    if (!ethereum) {
      console.log("No ethereum object");
      throw new Error("No ethereum object");
    }
    try {
      const { tokenAddress } = token;
      console.log(tokenAddress);
      const transactionsContract = createEthereumContract();
      if (ethereum) {
        await ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: tokenAddress,
              symbol: "TOKEN",
              decimals: 18,
            },
          },
        });
        const tokenHash = await transactionsContract.addTokenAddress(tokenAddress);
        console.log(tokenHash);
        setIsLoading(true);
        console.log(`Loading - ${tokenHash.hash}`);
        await tokenHash.wait();
        console.log(`Success - ${tokenHash.hash}`);
        setIsLoading(false);

        const tokenCount = await transactionsContract.getTokenCount();
        setTokenCount(tokenCount.toNumber());
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  
     
  };

  const fetchAllTokenBalances = async () => {
    if (currentAccount) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const balanceList = {};
      const tokenDetailsList = {};
  
      for (const token of tokenAddresslist) {
        const tokenContract = new ethers.Contract(token, contractABI, provider);
        try {
          // Fetch balance
          const balance = await tokenContract.balanceOf(currentAccount);
          balanceList[token] = ethers.utils.formatUnits(balance, 18);
  
          // Fetch token name
          const name = await tokenContract.name();
          
          // Fetch token symbol
          const symbol = await tokenContract.symbol();
  
          // Store token details
          tokenDetailsList[token] = { name, symbol };
        } catch (error) {
          console.error(`Error fetching details for token ${token}:`, error);
        }
      }
  
      setTokenBalanceList(balanceList);
      setTokenDetailsList(tokenDetailsList);
    }
  };

  const getTokenAddresses = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTokenAddresses = await transactionsContract.getAllTokenAddresses();

        setTokenAddresslist(availableTokenAddresses);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
    checkIfTransactionsExists();
  }, [transactionCount]); 

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        transactions,
        currentAccount,
        isLoading,
        sendTransaction,
        handleChange,
        formData,
        addToken,
        token,
        tokenAddresslist,
        tokenBalanceList,
        tokenDetailsList,
        fetchAllTokenBalances,
        getTokenAddresses,
        tokenCount
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
