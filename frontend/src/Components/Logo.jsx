import React from "react";
import { Link } from "react-router-dom";
import YourWORDS from "../Imgs/YourWORDS.png";

const Logo = ({ className = "" }) => {
  return (
    <Link
      to={"/"}
      className={`w-42 md:w-60 text-xl md:text-3xl font-bold flex items-center ${className}`}
    >
      <img src={YourWORDS} alt="YourWORDS Logo" className="mt-1 h-6 md:h-8.5 w-auto" />
      <p>Your<span className="font-extrabold">WORDS</span></p>
    </Link>
  );
};

export default Logo;
