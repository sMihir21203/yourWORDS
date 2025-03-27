import React from 'react'

const Button = ({
    style = "default",
    icon: Icon,
    iconSize = 20,
    text,
    className = "",
    ...props
}) => {

    const styles = {
        default: "w-9 h-9 flex items-center justify-center",

        imp: "min-w-full h-10 text-xl hover:pb-1",

        gradient: "w-fit px-2 text-xl text-white pb-1 bg-gradient-to-br hover:bg-gradient-to-r from-[#ff007f] via-sky-300 to-[#003cff] hover:text-transparent hover:bg-clip-text"
    }

    return <button className={`font-bold  border-none rounded-lg  shadow hover:shadow-md shadow-base-content ${styles[style]} ${className}`} {...props}>
        {Icon && <Icon size={iconSize} />}
        {text && <span>{text}</span>}
    </button>;
}

export default Button