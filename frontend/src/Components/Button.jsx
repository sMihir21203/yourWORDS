import React from 'react'

const Button = ({
    style = "default",
    icon: Icon,
    urlIcon,
    iconSize = 20,
    text,
    className = "",
    ...props
}) => {

    const styles = {
        default: "w-9 h-8.5  ",

        imp: "w-70 h-10 text-xl hover:pb-1",

        gradient: "w-18 md:w-20 h-10 -mt-1 md:w-24 text-nowrap text-[1.1rem] md:text-xl text-white bg-gradient-to-br from-[#ff007f] via-sky-300 to-[#003cff]"
    }

    return <button className={` btn px-0 font-bold  border-none bg-base-100 rounded-lg  shadow hover:shadow-md shadow-accent-content ${styles[style]} ${className}`} {...props}>
        {Icon && <Icon size={iconSize} />}
        {urlIcon && <img src={urlIcon} className='w-fit h-12' />}
        {text && <span>{text}</span>}
    </button>;
}

export default Button