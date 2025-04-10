import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Menu = ({
    className = "",
    links = [],
    makeActive,
    ...props
}) => {
    const location = useLocation();

    // Default active link style
    const activeLink = (path) => {
        return location.pathname === path
            ? "px-1 pb-1 font-semibold text-[#ff007f]"
            : "px-1 pb-1 font-semibold hover:text-[#ff007f]";
    };

    // Plain link (no active logic)
    const plainLink = () => "px-1 pb-1 font-semibold hover:text-[#ff007f]";

    // Decide which function to use
    const getLinkClass = makeActive === "no" ? plainLink : activeLink;

    return (
        <>
            {links.map(({ name, path }, index) => (
                <Link
                    key={index}
                    className={`${getLinkClass(path)} ${className}`}
                    to={path}
                    {...props}>
                    {name}
                </Link>
            ))}
        </>
    );
};

export default Menu;
