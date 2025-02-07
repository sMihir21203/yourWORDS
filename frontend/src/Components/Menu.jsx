import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Menu = () => {
    // activeLink
    const location = useLocation();
    const liveLink = (path) => {
        return location.pathname === path
            ? "font-bold border-b-2 bg-gradient-to-r from-pink-600 to-blue-600 text-transparent bg-clip-text border-pink-600 border-b-[3px]"
            : "hover:bg-gradient-to-r from-pink-600 to-blue-600 hover:text-transparent hover:bg-clip-text hover:border-pink-600 hover:border-b-[3px]";
    };
    return (
        <>
            <Link className={liveLink("/")} to='/'>
                Home
            </Link>
            <Link className={liveLink('/about')} to='/about'>
                About
            </Link>
            <Link className={liveLink('/portfolio')} to='/portfolio'>
                Portfolio
            </Link>

        </>
    )
}

export default Menu