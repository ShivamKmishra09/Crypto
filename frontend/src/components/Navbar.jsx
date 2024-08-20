import React, { useState,useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const path = window.location.pathname.split("/")[1];
    setActive(path || "home");
  }, []);

  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-[#1d1d1d] border-b border-gray-800">
      <Link to="/" className="text-white text-lg font-semibold">
        Krypto
      </Link>

      <ul className="flex">
        <li className="mx-2">
          <Link
            to="/"
            className={`${
              active === "home" ? "text-white" : "text-white"
            } text-sm`}
          >
            Home
          </Link>
        </li>
        <li className="mx-2">
          <Link
            to="/exchange"
            className={`${
              active === "Exchange" ? "text-white" : "text-white"
            } text-sm`}
          >
            Exchange
          </Link>
        </li>
        <li className="mx-2">
          <Link
            to="/transactions"
            className={`${
              active === "transactions" ? "text-white" : "text-white"
            } text-sm`}
          >
            Transactions
          </Link>
        </li>
      </ul>
    </nav>
  );

};

export default Navbar;

