import React from 'react'
import loader_img from "../Imgs/loader_img.png"

const Loader = ({
    className = "",
    ...props
}) => {
    return (
        <img
            src={loader_img}
            alt="Loading..."
            className={`self-center justify-self-center animate-spin h-10 w-auto ${className}`}
            {...props}
        />
    )
}

export default Loader