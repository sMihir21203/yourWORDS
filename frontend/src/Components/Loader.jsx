import React from 'react'

const Loader = ({
    className = ""
}) => {
    return (
        <div className={`${className} self-center justify-self-center rounded-full animate-spin w-8 h-8 border-[4px] border-transparent border-t-base-content border-b-base-content border-r-base-content`} />
    )
}

export default Loader