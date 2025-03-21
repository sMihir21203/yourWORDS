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
        default: "w-9 h-8.5 ",

        imp: "min-w-full h-10 text-xl hover:pb-1",

        gradient: "w-18 md:w-24 h-10 md:pb-1 -mt-1 text-nowrap text-[1.1rem] md:text-xl text-white bg-gradient-to-br from-[#ff007f] via-sky-300 to-[#003cff]"
    }

    return <button className={` btn px-0 font-bold  border-none bg-base-100 rounded-lg  shadow hover:shadow-md shadow-base-content ${styles[style]} ${className}`} {...props}>
        {Icon && <Icon size={iconSize} />}
        {text && <span>{text}</span>}
    </button>;
}

export default Button