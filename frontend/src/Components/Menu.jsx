import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Menu = ({
    links = [],
    ...props
}) => {
    const location = useLocation();

    // activeLink
    const activeLink = (path) => {
        return location.pathname === path
            ? "font-bold border-b-2 bg-gradient-to-r from-pink-600 to-blue-600 text-transparent bg-clip-text border-pink-600 border-b-[3px]"
            : "hover:bg-gradient-to-r from-pink-600 to-blue-600 hover:text-transparent hover:bg-clip-text";
    };

    return (
        <>
            {
                links.map(({ name, path }, index) => (
                    <Link
                        key={index}
                        className={activeLink(path)}
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