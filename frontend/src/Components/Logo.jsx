import React from "react";
import { Link } from "react-router-dom";
import YourWORDS from "../Imgs/YourWORDS.png";

const Logo = ({ to = "/", className = "", icon: Icon, ...props }) => {
  return (
    <Link
      to={to}
      className={`p-1.5 w-42 md:w-60 text-xl md:text-3xl font-bold flex ${className}`}
      {...props}
    >
        <img src={YourWORDS} alt="YourWORDS Logo" className="h-8 md:h-10.5 w-auto" />
        <p className="m-0 p-0 hover:bg-gradient-to-br from-[#ff007f] via-sky-300 to-[#003cff] hover:text-transparent hover:bg-clip-text ">Your<span className="font-extrabold">WORDS</span></p>
    </Link>
  );
};

export default Logo;
