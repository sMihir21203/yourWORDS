import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Menu = ({
    className="",
    links = [],
    ...props
}) => {
    const location = useLocation();

    // activeLink
    const activeLink = (path) => {
        return location.pathname === path
            ? "px-1 pb-1 font-bold rounded-md bg-gradient-to-br from-[#ff007f] via-sky-300 to-[#003cff] text-transparent bg-clip-text shadow-sm shadow-accent-content"
            : "px-1 pb-1 font-bold rounded-md hover:bg-gradient-to-br from-[#ff007f] via-sky-300 to-[#003cff] hover:text-transparent hover:bg-clip-text";
    };

    return (
        <>
            {
                links.map(({ name, path }, index) => (
                    <Link
                        key={index}
                        className={`${activeLink(path)} ${className}`}
                        to={path}
                        {...props}>
                        {name}
                    </Link>
                ))
            }
        </>
    )
}

export default Menu